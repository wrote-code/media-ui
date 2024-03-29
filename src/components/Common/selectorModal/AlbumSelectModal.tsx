import { AlbumVo } from '@/types/entity';
import { ModelType } from '@/types/model';
import { Input, Modal } from 'antd';
import Table, { ColumnType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'umi';
import './style.less';

interface PropsType {
  albumList: AlbumVo[];
  onSelect: (data: AlbumVo) => void;
  total: number;
  resourceId: string;
  visible: boolean;
  onCancel: () => void;
  resourceName: string;
}

const AlbumSelectModal: React.FC<PropsType> = (props) => {
  const { albumList, total, visible, onCancel, resourceName, onSelect, resourceId } = props;
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    dispatch({
      type: 'selectModal/albumSelectModal/queryAlbumList',
      payload: {
        params: {
          current: current,
          pageSize: 10,
          selectModal: true,
          resourceId,
        },
      },
    });
  }, [dispatch]);

  const columns: ColumnType<AlbumVo>[] = [
    {
      title: '专辑名称',
      dataIndex: 'name',
    },
  ];

  const rowClassName = (record: AlbumVo) => {
    if (record.resourceId) {
      return 'selectRow';
    }
    return '';
  };

  const onRow: (data: AlbumVo) => React.HTMLAttributes<any> = (data: AlbumVo) => ({
    onClick: () => {
      onSelect(data);
    },
  });

  const onPageChange = (page: number) => {
    setCurrent(page);
    dispatch({
      type: 'selectModal/albumSelectModal/queryAlbumList',
      payload: {
        params: {
          current: page,
          pageSize: 10,
          selectModal: true,
          resourceId,
        },
      },
    });
  };

  const onSearch = (value: string) => {
    dispatch({
      type: 'selectModal/albumSelectModal/queryAlbumList',
      payload: {
        params: {
          current: current,
          pageSize: 10,
          selectModal: true,
          albumName: value,
          resourceId,
        },
      },
    });
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      onOk={onCancel}
      title={`为【${resourceName}】选择专辑`}
    >
      <Input.Search onSearch={onSearch} />
      <Table
        rowClassName={rowClassName}
        size="small"
        rowKey="id"
        columns={columns}
        dataSource={albumList}
        pagination={{
          current: current,
          showTotal: (total) => `总计:${total}`,
          total: total,
          onChange: onPageChange,
          pageSize: 10,
        }}
        onRow={onRow}
      />
    </Modal>
  );
};

export default connect(({ 'selectModal/albumSelectModal': { albumList, total } }: ModelType) => ({
  albumList,
  total,
}))(AlbumSelectModal);
