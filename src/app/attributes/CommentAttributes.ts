export interface CommentAttributesInterface {
  by: string;
  id: number;
  parent: number;
  text: string;
  time: number;
  type: string;
  kids?: CommentAttributesInterface[];
}
