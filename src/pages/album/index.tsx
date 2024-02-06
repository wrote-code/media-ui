import { queryAlbumList } from '@/services/album';
import type { AlbumVo } from '@/types/entity';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button, Input, Popover, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { AlbumModelState } from 'umi';
import { connect, useDispatch } from 'umi';

type PropsType = AlbumModelState;

const Album: React.FC<PropsType> = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const actionRef = useRef<ActionType>();

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

  const addAlbum = () => {
    if (name.length === 0 || name.length > 32) {
      message.warn('专辑名称过长或为空');
      return;
    }
    dispatch({
      type: 'album/addAlbum',
      payload: {
        albumName: name.trim(),
      },
    });
    setName('');
    actionRef.current?.reload();
  };

  const formPopover: React.FC = () => {
    return (
      <>
        <Input
          style={{ marginBottom: 5 }}
          onPressEnter={(e) => addAlbum()}
          size="small"
          placeholder="请输入专辑名称"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button size="small" type="primary" onClick={(e) => addAlbum()}>
          确定
        </Button>
      </>
    );
  };

  return (
    <ProTable<AlbumVo>
      columns={columns}
      rowKey="id"
      defaultSize="small"
      actionRef={actionRef}
      toolBarRender={() => [
        <Popover key={1} content={formPopover} trigger="click">
          <Button>新建</Button>
        </Popover>,
      ]}
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
