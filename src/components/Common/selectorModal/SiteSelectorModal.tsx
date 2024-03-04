import type { ModelType } from '@/types/model';
import type { SiteVo } from '@/types/entity';
import { Form, Input, Modal, Table } from 'antd';
import Button from 'antd/es/button';
import type { Rule } from 'antd/lib/form';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'umi';

interface PropsType {
  /**
   * 从redux获取的网站清单。
   */
  siteList?: SiteVo[];
  /**
   * 从redux中获取的网站总量。
   */
  total?: number;
  /**
   * 当前页，由父组件传入。
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
  onSelect: (record: SiteVo) => void;
  /**
   * 当前选择的网站。第一次打开时为空。由父组件控制。
   */
  selectedSite: SiteVo;
  /**
   * 弹框标题
   */
  title?: string;
}

/**
 * 从列表中选择网站，将勾选的站点的id返回父组件（通过回调函数）。
 *
 * 此组件会从调用model:site/querySiteList来获取网站清单，默认情况下一次获取5个。目前
 * 无法更改此默认值。
 *
 * @param props 属性
 * @returns 选择框
 */
const SiteSelectorModal: React.FC<PropsType> = (props: PropsType) => {
  const dispatch = useDispatch();
  const { siteList, total, currentPage, setCurrentPage, title } = props;
  // 表格上方的搜索框
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch({
      type: 'site/querySiteList',
      payload: {
        filter: {},
        sort: {},
        params: {
          current: currentPage,
          pageSize: 10,
        },
      },
    });
  }, [currentPage, dispatch]);

  const rowSelection = {
    type: 'radio',
    onSelect: (record: SiteVo) => {
      props.onSelect(record);
      form.resetFields();
    },
    selectedRowKeys: props.selectedSite == null ? [] : [props.selectedSite.id],
  };

  const onRow: (data: SiteVo) => React.HTMLAttributes<any> = (data: SiteVo) => ({
    onClick: () => {
      props.onSelect(data);
      form.resetFields();
    },
  });

  const onPageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    dispatch({
      type: 'site/querySiteList',
      payload: {
        filter: {},
        sort: {},
        params: {
          current: page,
          pageSize: pageSize,
        },
      },
    });
  };

  const search = () => {
    const values = form.getFieldsValue();
    dispatch({
      type: 'site/querySiteList',
      payload: {
        filter: {},
        sort: {},
        params: {
          current: currentPage,
          pageSize: 10,
          ...values,
        },
      },
    });
  };

  const searchForm = () => {
    const style = {
      display: 'inline-flex',
      width: '40%',
      marginLeft: 5,
    };
    const rules1: Rule[] = [
      {
        type: 'string',
        min: 1,
      },
      {
        whitespace: true,
        message: '输入不能为空白字符',
      },
    ];

    const rules2: Rule[] = [
      {
        type: 'url',
        min: 1,
        message: '无效网址',
      },
      {
        whitespace: true,
        message: '输入不能为空白字符',
      },
    ];

    return (
      <Form form={form}>
        <Form.Item style={style} rules={rules1} label="网站名称" name="siteName">
          <Input />
        </Form.Item>
        <Form.Item style={style} rules={rules2} label="网站地址" name="url">
          <Input />
        </Form.Item>
        <Button style={{ marginLeft: 5 }} type="primary" onClick={() => search()}>
          搜索
        </Button>
      </Form>
    );
  };

  const columns: any = [
    {
      dataIndex: 'siteName',
      title: '网站名称',
    },
    {
      dataIndex: 'url',
      title: '网址',
    },
  ];

  return (
    <Modal
      title={title ? title : '选择网站'}
      visible={props.visible}
      onCancel={props.onCancel}
      footer={null}
    >
      {searchForm()}
      <Table
        size="small"
        pagination={{
          current: currentPage,
          pageSize: 10,
          total,
          showTotal: (total) => `总计:${total}`,
          onChange: onPageChange,
        }}
        rowSelection={rowSelection}
        onRow={onRow}
        rowKey="id"
        columns={columns}
        dataSource={siteList}
      />
    </Modal>
  );
};

export default connect(({ site: { siteList, total } }: ModelType) => ({
  siteList,
  total,
}))(SiteSelectorModal);
