import type { ModelType } from '@/models/common/model';
import { ProFormTreeSelect } from '@ant-design/pro-form';
import React from 'react';
import { connect } from 'umi';

interface DirectorySelectStateType {
  /**
   *  表单项名称。
   */
  name: string;
  placeHolder?: string;
}

/**
 * 目录下拉框，可以选择目录层级。
 * @param props
 */
const DirectorySelect: React.FC<DirectorySelectStateType> = (props) => {
  const { name, placeHolder } = props;

  return <ProFormTreeSelect name={name} placeholder={placeHolder ? placeHolder : '请选择目录'} />;
};

export default connect(({ 'select/directory': { treeData, newTreeData } }: ModelType) => ({
  treeData: treeData,
  newTreeData: newTreeData,
}))(DirectorySelect);
