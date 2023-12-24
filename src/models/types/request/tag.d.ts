import type { TablePagination } from './table';

export interface TagReferenceParam extends TablePagination {
  id?: string;

  resourceId?: string;

  tagId?: string;

  tagName?: string;

  pageSize: number;

  current: number;
}
