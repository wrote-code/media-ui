import { ResourceVo } from '@/types/entity';
import { ModelType } from '@/types/model';
import { TableResponse } from '@/types/response/table';
import { useDebounceFn } from 'ahooks';
import { Input, Modal, Table, TableColumnType, TablePaginationConfig } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'umi';

interface PropsType {
  onSelect: (data: ResourceVo) => void;
  onCancel: () => void;
  response?: TableResponse<ResourceVo>;
  visible: boolean;
}

const ResourceSelectModal: React.FC<PropsType> = (props) => {
  const { onCancel, onSelect, response, visible } = props;
  const [current, setCurrent] = useState(1);
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'selectModal/resource/queryList',
      payload: {
        params: {
          current,
          pageSize: 10,
          filename: name,
        },
      },
    });
  }, [dispatch]);

  const columns: TableColumnType<ResourceVo>[] = [
    {
      title: '文件名',
      ellipsis: true,
      dataIndex: 'filename',
    },
    {
      title: '路径',
      ellipsis: true,
      dataIndex: 'dir',
    },
  ];

  const pagination: TablePaginationConfig = {
    showTotal: (total) => `总计:${total}`,
    onChange: (page) => {
      setCurrent(page);
      dispatch({
        type: 'selectModal/resource/queryList',
        payload: {
          params: {
            current,
            pageSize: 10,
            filename: name,
          },
        },
      });
    },
    total: response?.total,
    current: current,
  };

  const onRow = (data: ResourceVo) => ({
    onClick: () => {
      onSelect(data);
      onCancel();
    },
  });

  const { run: onSearch } = useDebounceFn(
    (value: string) => {
      dispatch({
        type: 'selectModal/resource/queryList',
        payload: {
          params: {
            current,
            pageSize: 10,
            filename: name,
          },
        },
      });
    },
    { wait: 500 },
  );

  return (
    <Modal visible={visible} title="选择资源" onCancel={onCancel} onOk={onCancel}>
      <Input.Search value={name} onSearch={onSearch} onChange={(e) => setName(e.target.value)} />
      <Table
        size="small"
        columns={columns}
        pagination={pagination}
        dataSource={response?.data}
        onRow={onRow}
      />
    </Modal>
  );
};

export default connect(({ 'selectModal/resource': { response } }: ModelType) => ({
  response,
}))(ResourceSelectModal);
