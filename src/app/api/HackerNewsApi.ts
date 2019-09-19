import Firebase from "firebase/app";
import "firebase/database";
import LRU from "lru-cache";
import { ItemAttributesInterface } from "../attributes/ItemAttributes";
import { CommentAttributesInterface } from "../attributes/CommentAttributes";
import { UserAttributesInterface } from "../attributes/UserAttributes";

class HackerNewsApi {
  private readonly displayNumber: number;
  private readonly api: Firebase.database.Reference;
  private readonly cache: LRU<string, any>;

  public constructor() {
    this.displayNumber = 20;

    if (!Firebase.apps.length) {
      Firebase.initializeApp({
        databaseURL: "https://hacker-news.firebaseio.com"
      });
    }
    this.api = Firebase.database().ref("/v0");
    this.cache = new LRU({
      max: 500,
      maxAge: 1000 * 60 * 60
    });
  }

  public async getTopStoryItems(page = 1): Promise<ItemAttributesInterface[]> {
    const ids = await this.getTopStoryItemIds();
    const offset = this.displayNumber * (page - 1);
    const limit = offset + this.displayNumber;
    return await Promise.all(
      ids.slice(offset, limit).map(async (id) => await this.findItem(id))
    );
  }

  public async getTopStoryItemIds(): Promise<number[]> {
    if (this.cache.has("topstories")) return this.cache.get("topstories");
    const snapshot = await this.api.child("/topstories").once("value");
    const value = snapshot.val();
    this.cache.set("topstories", value);
    return value;
  }

  public async findItem(id: number): Promise<any> {
    if (this.cache.has(`item/${id}`)) return this.cache.get(`item/${id}`);
    const snapshot = await this.api.child(`/item/${id}`).once("value");
    const value = snapshot.val();
    this.cache.set(`item/${id}`, value);
    return value;
  }

  public async getComments(
    ids?: number[]
  ): Promise<CommentAttributesInterface[]> {
    if (!ids) {
      return [];
    }

    const comments = await Promise.all(
      ids.map(async (id) => await this.findItem(id))
    );
    return await Promise.all(
      comments
        .filter((comment) => comment !== null)
        .map(async (comment) => {
          const comments = await this.getComments(comment.kids);
          return { ...comment, kids: comments };
        })
    );
  }

  public async findUser(id: number): Promise<UserAttributesInterface> {
    if (this.cache.has(`/user/${id}`)) return this.cache.get(`/user/${id}`);
    const snapshot = await this.api.child(`/user/${id}`).once("value");
    const value = snapshot.val();
    this.cache.set(`/user/${id}`, value);
    return value;
  }
}

export const hackerNewsApi = new HackerNewsApi();
