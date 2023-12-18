import AuthorInput from '@/components/Common/input/AuthorInput';
import type { ModelType } from '@/models/common/model';
import type { ResourceVo } from '@/models/types';
import { fetchResourceListRequest } from '@/services/resource/resource';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, Tooltip, message } from 'antd';
import React, { useRef, useState } from 'react';
import { connect, useDispatch } from 'umi';
import ResourceFormModal from './ResourceFormModal';
import ResourceTags from './resourceTag';
import TagDrawer from './TagDrawer';
interface ResourceProps {
  resourceList: ResourceVo[];
}

const Resource: React.FC<ResourceProps> = () => {
  const dispatch = useDispatch();
  const actionRef = useRef<ActionType>();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [resourceId, setResourceId] = useState('');

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

  const onTagClick = (entity: ResourceVo) => {
    setResourceId(entity.id);
    setDrawerVisible(true);
  };

  const onTagDrawerClose = () => {
    setDrawerVisible(false);
  };

  const renderTag = (_dom: any, entity: ResourceVo) => {
    // todo 1+n查询方案优化
    return (
      <Tooltip title={<ResourceTags resourceId={entity.id} tagList={entity.tagReferenceVoList} />}>
        <div>
          <ResourceTags resourceId={entity.id} tagList={entity.tagReferenceVoList} />
        </div>
      </Tooltip>
    );
  };

  const columns: ProColumns<ResourceVo>[] = [
    {
      title: '文件名',
      dataIndex: 'filename',
      width: 100,
      ellipsis: true,
      copyable: true,
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
      // width: '30%',
      dataIndex: 'dir',
      ellipsis: true,
      copyable: true,
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
      ellipsis: true,
      copyable: true,
      renderFormItem: (_item, _c, form) => {
        // 使用authorName和authorId，增加可读性，同时防止和resource的id混淆。
        // 返回时username是嵌套属性，查询时不是嵌套属性
        return <AuthorInput form={form} labelName="authorName" valueName="authorId" />;
      },
      width: 100,
    },
    // {
    //   title: '专辑',
    //   hideInSearch: true,
    //   dataIndex: ['albumVo', 'albumName'],
    //   width: 150,
    // },
    {
      title: '标签',
      hideInSearch: true,
      width: 330,
      ellipsis: true,
      onCell: (data) => ({
        onClick: () => onTagClick(data),
      }),
      render: renderTag,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
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

  // request={async (params, sorter, filter) =>
  //   fetchResourceListRequest({ params, sorter, filter })
  // }

  return (
    <div>
      <ProTable<ResourceVo>
        rowKey="id"
        actionRef={actionRef}
        defaultSize="small"
        columns={columns}
        request={async (params, sorter, filter) =>
          fetchResourceListRequest({ params, sorter, filter }).then((v) => {
            if (v.success) {
              return v;
            } else {
              message.error(v.message);
            }
          })
        }
        toolBarRender={() => <ResourceFormModal reload={reload} />}
      />
      {drawerVisible && (
        <TagDrawer
          onClose={onTagDrawerClose}
          visible={drawerVisible}
          resourceId={resourceId}
          key={resourceId}
        />
      )}
    </div>
  );
};

export default connect(({ resource: { resourceList } }: ModelType) => ({
  resourceList,
}))(Resource);
