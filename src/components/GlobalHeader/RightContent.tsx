import type { ConnectState } from '@/models/connect';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { Settings as ProSettings } from '@ant-design/pro-layout';
import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import type { ConnectProps } from 'umi';
import { request, connect, Link } from 'umi';
import styles from './index.less';

export interface GlobalHeaderRightProps extends Partial<ConnectProps>, Partial<ProSettings> {
  theme?: ProSettings['navTheme'] | 'realDark';
}

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = (props) => {
  const { theme, layout } = props;
  let className = styles.right;

  const [version, setVersion] = useState();

  useEffect(() => {
    request('/api/version/main', {
      method: 'GET',
    })
      .then((v) => setVersion(v))
      .catch((e) => {
        console.error(e);
        setVersion(undefined);
      });
  });

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <Link to="/release-note">{version}</Link>
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
