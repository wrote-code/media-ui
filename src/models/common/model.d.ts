import type {
  AuthorStateType,
  SiteStateType,
  ResourceStateType,
  SelectAuthorStateType,
  DirectoryModelStateType,
  TagStateType,
} from 'umi';

export interface ModelType {
  'modal/selectAuthor': SelectAuthorStateType;
  'select/directory': DirectoryModelStateType;
  resource: ResourceStateType;
  author: AuthorStateType;
  site: SiteStateType;
  tag: TagStateType;
}
