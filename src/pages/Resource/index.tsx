import type { ResourceStateType } from '@/models/resource/resource';
import type { ResourceVo } from '@/models/types';
import { fetchResourceListRequest } from '@/services/resource/resource';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm } from 'antd';
import React, { useRef } from 'react';
import { connect, useDispatch } from 'umi';
import ResourceFormModal from './ResourceFormModal';
interface ResourceProps {
  resourceList: ResourceVo[];
}

const Resource: React.FC<ResourceProps> = () => {
  const dispatch = useDispatch();
  const actionRef = useRef<ActionType>();

  const reload = () => {
    actionRef.current?.reload();
  };

  const deleteResource = (id: string) => {
    dispatch({
      type: 'resource/deleteResource',
      payload: id,
    });
    reload();
  };

  const columns: ProColumns<ResourceVo>[] = [
    {
      title: '文件名',
      dataIndex: 'filename',
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
      width: '30%',
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
      hideInSearch: true,
      width: 150,
    },
    // {
    //   title: '专辑',
    //   hideInSearch: true,
    //   dataIndex: ['albumVo', 'albumName'],
    //   width: 150,
    // },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
      valueType: 'dateTime',
      width: 150,
    },
    {
      title: '操作',
      hideInSearch: true,
      width: 50,
      render: (_, entity: ResourceVo) => {
        return (
          <Popconfirm
            title="确认删除"
            okButtonProps={{ danger: true, type: 'primary' }}
            onConfirm={() => deleteResource(entity.id)}
          >
            <Button size="small" type="primary" danger>
              删除
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div>
      <ProTable<ResourceVo>
        rowKey="id"
        actionRef={actionRef}
        defaultSize="small"
        columns={columns}
        request={async (params, sorter, filter) =>
          fetchResourceListRequest({ params, sorter, filter })
        }
        toolBarRender={() => <ResourceFormModal reload={reload} />}
      />
    </div>
  );
};

export default connect(({ resourceList }: ResourceStateType) => ({
  resourceList,
}))(Resource);
