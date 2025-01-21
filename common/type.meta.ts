export type MetaType =
  | string
  | number
  | boolean
  | Record<'token', Record<'accToken' | 'reftoken', string>>;

export interface IMeta {
  statusCode: number;
  message: string;
  [key: string]: string | number | object;
}
