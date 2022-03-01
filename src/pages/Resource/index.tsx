import type { ResourceStateType } from '@/models/resource/resource';
import type { ResourceVo } from '@/models/types';
import { fetchResourceListRequest } from '@/services/resource/resource';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import React from 'react';
import { connect, Dispatch } from 'umi';

interface ResourceProps {
  dispatch: Dispatch,
  resourceList: ResourceVo[],
}

const Resource: React.FC<ResourceProps> = (props) => {
  const columns: ProColumns<ResourceVo>[] = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 20
    },
    {
      title: '文件名',
      dataIndex: 'filename',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '必须填写件名'
          }
        ]
      }
    },
    {
      title: '资源目录',
      dataIndex: 'dir',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '必须填写资源目录'
          }
        ]
      }
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

  const fetchResourceListDemo = () => {
    const { dispatch } = props;
    dispatch({
      type: 'resource/fetchResourceList'
    });
  }


  return (
    <div>
      <ProTable<ResourceVo>
        columns={columns}
        request={async (params, sorter, filter) => fetchResourceListRequest({ params, sorter, filter })}
      />
    </div>
  );
};

export default connect(({ resourceList }: ResourceStateType) => ({
  resourceList
}))(Resource);
