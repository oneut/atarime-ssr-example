import { UserAttributesInterface } from "../attributes/UserAttributes";

interface ItemType {
  id: string;
  karma: number;
  created: number;
}

export class User implements ItemType {
  public readonly id: string;
  public readonly karma: number;
  public readonly created: number;

  public constructor(user: UserAttributesInterface) {
    this.id = user.id;
    this.karma = user.karma;
    this.created = user.created;
  }
}
