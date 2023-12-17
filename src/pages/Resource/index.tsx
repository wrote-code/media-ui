import AuthorInput from '@/components/Common/input/AuthorInput';
import type { ResourceStateType } from '@/models/resource/resource';
import type { ResourceVo } from '@/models/types';
import { fetchResourceListRequest } from '@/services/resource/resource';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, Tag, Tooltip, message } from 'antd';
import React, { useRef } from 'react';
import { connect, useDispatch } from 'umi';
import ResourceFormModal from './ResourceFormModal';
interface ResourceProps {
  resourceList: ResourceVo[];
}

// 颜色数组，用于给标签着色
const colorArray = [
  '#ffa39e',
  '#ffa940',
  '#fff1b8',
  '#ffc53d',
  '#73d13d',
  '#5cdbd3',
  '#4096ff',
  '#b37feb',
  '#f759ab',
  '#ffd6e7',
];
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

  const renderTag = (_dom: any, entity: ResourceVo) => {
    // todo 1+n查询方案优化
    // 为防止溢出，只显示前5个标签。标签按创建时间正序排列
    const tags = () => (
      <div>
        <React.Fragment>
          {entity.tagReferenceVoList.map((tag, index) => {
            if (index >= 5) {
              return '';
            } else {
              return (
                <Tag color={colorArray[index % 10]} key={tag.id} style={{ color: 'black' }}>
                  {tag.tagVo.name}
                </Tag>
              );
            }
          })}
        </React.Fragment>
      </div>
    );
    return <Tooltip title={tags()}>{tags()}</Tooltip>;
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
    </div>
  );
};

export default connect(({ resourceList }: ResourceStateType) => ({
  resourceList,
}))(Resource);
