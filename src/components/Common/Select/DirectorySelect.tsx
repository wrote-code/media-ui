import type { ModelType } from '@/types/model';
import { ProFormTreeSelect } from '@ant-design/pro-form';
import type { ProFormFieldItemProps } from '@ant-design/pro-form/lib/interface';
import React from 'react';
import { connect } from 'umi';

interface DirectorySelectStateType {
  /**
   *  表单项名称。
   */
  name: string;
  placeHolder?: string;
  fieldProps: ProFormFieldItemProps;
}

/**
 * 目录下拉框，可以选择目录层级。
 * @param props
 */
const DirectorySelect: React.FC<DirectorySelectStateType> = (props) => {
  const { placeHolder, fieldProps } = props;

  return (
    <ProFormTreeSelect
      {...fieldProps}
      placeholder={placeHolder ? placeHolder : '请选择目录'}
    />
  );
};

export default connect(({ 'select/directory': { treeData } }: ModelType) => ({
  treeData: treeData,
}))(DirectorySelect);
