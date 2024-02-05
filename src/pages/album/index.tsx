import { queryAlbumList } from '@/services/album';
import type { AlbumVo } from '@/types/entity';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { message } from 'antd';
import React from 'react';
import type { AlbumModelState } from 'umi';
import { connect, useDispatch } from 'umi';

type PropsType = AlbumModelState;

const Album: React.FC<PropsType> = () => {
  const dispatch = useDispatch();

  const columns: ProColumns<AlbumVo>[] = [
    {
      title: '专辑名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      hideInSearch: true,
      hideInForm: true,
    },
  ];

  return (
    <ProTable<AlbumVo>
      columns={columns}
      rowKey="id"
      defaultSize="small"
      request={async (params, sort, filter) => {
        params.albumName = params.name;
        return queryAlbumList({ params, sort, filter }).then((v) => {
          if (v.success) {
            return v;
          } else {
            message.error(v.message);
          }
        });
      }}
    />
  );
};

export default connect(() => ({}))(Album);
