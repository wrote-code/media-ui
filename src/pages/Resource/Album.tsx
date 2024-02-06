import { AlbumResourceVo } from '@/types/entity';
import { ModelType } from '@/types/model';
import { TableResponse } from '@/types/response/table';
import { Button, Modal, Table, TableColumnType } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'umi';

interface PropsType {
  resourceId: string;
  visible: boolean;
  onCancel: () => void;
  albumTableResponse: TableResponse<AlbumResourceVo>;
}

const Album: React.FC<PropsType> = (props: PropsType) => {
  const { resourceId, albumTableResponse, visible, onCancel } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'resource/queryAlbumList',
      payload: {
        params: {
          resourceId: resourceId,
        },
      },
    });
  }, [dispatch]);

  const onPaginationChange = (page: number, pageSize: number) => {
    setCurrent(page);
    setPageSize(pageSize);
  };

  const columns: TableColumnType<AlbumResourceVo>[] = [
    {
      title: '专辑名称',
      dataIndex: 'albumName',
    },
    {
      title: '操作',
      render: () => <Button size="small">删除</Button>,
    },
  ];

  const pagination = {
    current: current,
    pageSize: pageSize,
    onPaginationChange: onPaginationChange,
    total: albumTableResponse.total,
  };

  return (
    <Modal visible={visible} onCancel={onCancel} title="专辑">
      <Table
        columns={columns}
        size="small"
        pagination={pagination}
        dataSource={albumTableResponse.data}
      />
    </Modal>
  );
};

export default connect(({ resource: { albumTableResponse } }: ModelType) => ({
  albumTableResponse,
}))(Album);
