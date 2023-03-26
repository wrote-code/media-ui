import type { AuthorVo } from '@/models/types';
import type { SelectAuthorStateType } from '@/models/common/selectorModal/selectAuthor';
import React from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';

interface PropsType {
  /**
   * 作者清单。
   */
  authorList: AuthorVo[];
  /**
   * 已选择的作者。
   */
  selectedAuthor: AuthorVo | null;
  /**
   * 选择的作者所在页。
   */
  currentPage: number;
  /**
   * 当分页改变后的回调，用于将当前页返回父组件。
   */
  setCurrentPage: (page: number) => void;
  /**
   * 关闭弹框的回调，由父组件控制。
   */
  onCancel: () => void;
  /**
   * 弹框可见性，由父组件控制。
   */
  visible: boolean;
  /**
   * 选择一行内容时的回调。回调中必须关闭弹框。由父组件控制。
   */
  onSelect: (record: AuthorVo) => void;
}

const AuthorSelectorModal: React.FC<PropsType> = (props: PropsType) => {
  return <Modal onCancel={props.onCancel} onOk={props.onSelect} visible={props.visible} />;
};

export default connect(({ authorList, total }: SelectAuthorStateType) => ({
  authorList: authorList,
  total: total,
}))(AuthorSelectorModal);
