import { AlbumVo } from '@/types/entity';
import { ModelType } from '@/types/model';
import { Input, Modal } from 'antd';
import Table, { ColumnType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'umi';

interface PropsType {
  albumList: AlbumVo[];
  total: number;
  resourceId: string;
  visible: boolean;
  onCancel: () => void;
}

const AlbumSelectModal: React.FC<PropsType> = (props) => {
  const { albumList, total, resourceId, visible, onCancel } = props;
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [name, setName] = useState('');

  useEffect(() => {
    dispatch({
      type: 'selectModal/albumSelectModal/queryAlbumList',
      payload: {
        params: {
          current: current,
          pageSize: 5,
          albumName: name,
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

  const onRow: (data: AlbumVo) => React.HTMLAttributes<any> = (data: AlbumVo) => ({
    onClick: () => {
      dispatch({
        type: 'resource/setAlbum',
        payload: {
          resourceId: resourceId,
          albumId: data.id,
        },
      });
      onCancel();
      dispatch({
        type: 'resource/queryAlbumList',
        payload: {
          params: {
            resourceId: resourceId,
          },
        },
      });
    },
  });

  const onPageChange = (page: number) => {
    setCurrent(page);
    dispatch({
      type: 'selectModal/albumSelectModal/queryAlbumList',
      payload: {
        params: {
          current: page,
          pageSize: 5,
          albumName: name,
        },
      },
    });
  };

  const onSearch = (value: string) => {
    setName(value);
    dispatch({
      type: 'selectModal/albumSelectModal/queryAlbumList',
      payload: {
        params: {
          current: current,
          pageSize: 5,
          albumName: value,
        },
      },
    });
  };

  return (
    <Modal visible={visible} onCancel={onCancel} onOk={onCancel} title="选择专辑">
      <Input.Search onSearch={onSearch} />
      <Table
        size="small"
        rowKey="id"
        columns={columns}
        dataSource={albumList}
        pagination={{
          current: current,
          total: total,
          onChange: onPageChange,
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
