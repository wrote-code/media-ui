import type {
  SelectAuthorStateType,
  DirectoryModelStateType,
  ResourceStateType,
  AuthorStateType,
  SiteStateType,
  TagStateType,
  AlbumModelState,
} from 'umi';

/**
 * 此类型用于connect使用，避免mapStateToProps报错。
 */
export interface DefaultStateType {
  working: boolean;
}

export interface ModelType {
  'modal/selectAuthor': SelectAuthorStateType;
  'select/directory': DirectoryModelStateType;
  resource: ResourceStateType;
  author: AuthorStateType;
  site: SiteStateType;
  tag: TagStateType;
  album: AlbumModelState;
}
