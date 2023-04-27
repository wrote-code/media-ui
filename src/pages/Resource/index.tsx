import type { ResourceStateType } from '@/models/resource/resource';
import type { ResourceVo } from '@/models/types';
import { fetchResourceListRequest } from '@/services/resource/resource';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Popconfirm, Button } from 'antd';
import React from 'react';
import { connect, useDispatch } from 'umi';
import ResourceFormModal from './ResourceFormModal';
interface ResourceProps {
  resourceList: ResourceVo[];
}

const Resource: React.FC<ResourceProps> = () => {
  const dispatch = useDispatch();

  const columns: ProColumns<ResourceVo>[] = [
    {
      title: '文件名',
      dataIndex: 'filename',
      width: 200,
      ellipsis: true,
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
      hideInSearch: true,
      dataIndex: 'dir',
      ellipsis: true,
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
      dataIndex: ['authorVo', 'username'],
      width: 150,
    },
    {
      title: '专辑',
      hideInSearch: true,
      dataIndex: ['albumVo', 'albumName'],
      width: 150,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInSearch: true,
      width: 150,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
      valueType: 'date',
      width: 150,
    },
    {
      title: '操作',
      hideInSearch: true,
      width: 50,
      render: (_, entity: ResourceVo, index: number) => {
        return (
          <Popconfirm title="确认删除" onConfirm={() => onOk(entity.id)}>
            <Button size="small" type="primary" danger>
              删除
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  const onOk = (id: string) => {
    dispatch({
      type: 'resource/deleteResource',
      payload: id,
    });
  };

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
