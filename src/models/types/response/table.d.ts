export interface TableResponse<T> {
  /**
   * 当前页。
   */
  page?: number;

  /**
   * 页面容量。
   */
  pageSize?: number;

  /**
   * 总条数。
   */
  total: number;

  /**
   * 数据列表。
   */
  data: T[];

  message: string;

  success: boolean;
}
