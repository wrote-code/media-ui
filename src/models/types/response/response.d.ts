export interface ResponseData<T> {
  /**
   * 状态码。
   */
  statusCode: string;

  /**
   * 返回前台的数据。
   */
  data: T;

  /**
   * 提示信息。
   */
  message: string;
}
