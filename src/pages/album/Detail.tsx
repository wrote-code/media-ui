import { AlbumResourceVo } from '@/types/entity';
import { ModelType } from '@/types/model';
import { Button, Modal, Table, TablePaginationConfig } from 'antd';
import { ColumnType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'umi';

interface PropsType {
  albumId: string;
  albumName: string;
  visible: boolean;
  onCancel: () => void;
  dataList: AlbumResourceVo[];
  total: number;
}

const Detail: React.FC<PropsType> = (props) => {
  const { albumId, visible, onCancel, dataList, total, albumName } = props;
  const dispatch = useDispatch();

  const [current, setCurrent] = useState(1);

  useEffect(() => {
    dispatch({
      type: 'resource/queryAlbumList',
      payload: {
        params: {
          albumId: albumId,
          pageSize: 10,
          current: 1,
        },
      },
    });
  }, [dispatch]);

  const pagination: TablePaginationConfig = {
    pageSize: 10,
    total: total,
    current: current,
    onChange: (page) => {
      setCurrent(page);
      dispatch({
        type: 'resource/queryAlbumList',
        payload: {
          params: {
            albumId: albumId,
            pageSize: 10,
            current: page,
          },
        },
      });
    },
  };

  const columns: ColumnType<AlbumResourceVo>[] = [
    {
      title: '文件名',
      dataIndex: 'resourceName',
      ellipsis: true,
    },
    {
      title: '目录',
      dataIndex: 'resourceDir',
      ellipsis: true,
    },
    {
      title: '操作',
      render: (_, data) => (
        <Button
          size="small"
          onClick={() => {
            dispatch({
              type: 'resource/unsetAlbum',
              payload: {
                albumResourceId: data.id,
              },
            });
            dispatch({
              type: 'resource/queryAlbumList',
              payload: {
                params: {
                  albumId: albumId,
                },
              },
            });
          }}
        >
          删除
        </Button>
      ),
    },
  ];

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={`专辑【${albumName}】包含的资源`}
      onOk={onCancel}
    >
      <Table
        size="small"
        columns={columns}
        rowKey="id"
        dataSource={dataList}
        pagination={pagination}
      />
    </Modal>
  );
};

export default connect(({ resource: { albumTableResponse } }: ModelType) => ({
  dataList: albumTableResponse.data,
  total: albumTableResponse.total,
}))(Detail);
