import type { ResourceStateType } from '@/models/resource/resource';
import type { ResourceVo } from '@/models/types';
import { fetchResourceListRequest } from '@/services/resource/resource';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import React from 'react';
import { connect } from 'umi';
import ResourceFormModal from './ResourceFormModal';

interface ResourceProps {
  resourceList: ResourceVo[];
}

const Resource: React.FC<ResourceProps> = () => {
  const columns: ProColumns<ResourceVo>[] = [
    {
      title: '文件名',
      dataIndex: 'filename',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '必须填写件名',
          },
        ],
      },
    },
    {
      title: '资源目录',
      dataIndex: 'dir',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '必须填写资源目录',
          },
        ],
      },
    },
    {
      title: '作者',
      dataIndex: 'authorVo.username',
    },
    {
      title: '专辑',
      dataIndex: 'albumVo.albumName',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'date',
    },
  ];

  return (
    <div>
      <ProTable<ResourceVo>
        rowKey="id"
        defaultSize="small"
        columns={columns}
        request={async (params, sorter, filter) =>
          fetchResourceListRequest({ params, sorter, filter })
        }
        toolBarRender={() => <ResourceFormModal />}
      />
    </div>
  );
};

export default connect(({ resourceList }: ResourceStateType) => ({
  resourceList,
}))(Resource);
