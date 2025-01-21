import { MetaType } from 'common/type.meta';

export class ResData<TData> {
  meta: Record<string, MetaType>;

  constructor(
    statusCode: number,
    message: string,
    public data: TData | null = null,
    meta: Partial<Record<string, MetaType>> = {},
  ) {
    this.meta = {
      statusCode,
      message,
      ...meta,
    };
  }
}
