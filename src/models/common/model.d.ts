import type { DirectoryModelStateType } from '@/.umi/plugin-dva/connect';
import type { SelectAuthorStateType } from './selectorModal/selectAuthor';

export interface ModelType {
  'modal/selectAuthor': SelectAuthorStateType;
  'select/directory': DirectoryModelStateType;
}
