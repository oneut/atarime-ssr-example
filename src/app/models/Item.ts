import { URL } from "atarime";
import * as timeago from "timeago.js";
import { ItemAttributesInterface } from "../attributes/ItemAttributes";

export class Item {
  public readonly by: string;
  public readonly descendants: number;
  public readonly id: number;
  public readonly score: number;
  public readonly time: number;
  public readonly title: string;
  public readonly type: string;
  public readonly url: string;
  public readonly kids?: any;

  public constructor(attributes: ItemAttributesInterface) {
    this.by = attributes.by;
    this.descendants = attributes.descendants;
    this.id = attributes.id;
    this.score = attributes.score;
    this.time = attributes.time;
    this.title = attributes.title;
    this.type = attributes.type;
    this.url = attributes.url;
    this.kids = attributes.kids;
  }

  public getUrl() {
    if (this.url) {
      return this.url;
    }

    return URL.name("ItemPage", { itemId: this.id });
  }

  public getTimeAgo() {
    return timeago.format(this.time * 1000);
  }
}
