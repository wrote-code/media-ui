import { Typography } from 'antd';
import React from 'react';

const { Title, Paragraph, Link } = Typography;

interface PropsType {}
const ReleaseNote: React.FC<PropsType> = () => {
  return (
    <Typography>
      <Title level={3}>版本信息</Title>
      <Paragraph>
        <ul>
          <li>前台版本：v0.2.0-alpha</li>
          <li>后台版本：v0.2.1-alpha</li>
        </ul>
      </Paragraph>
      <Title level={3}>发行说明</Title>
      <Paragraph>
        <ul>
          {/* 前台发行说明在开发环境不可用 */}
          {/* 两个html需要手动复制到后台的static目录。 */}
          {/* release工作流包含复制发行说明的步骤。 */}
          <li>
            <Link href="/api/releasenote-ui.html">前台发行说明</Link>
          </li>
          <li>
            <Link href="/api/releasenote.html">后台发行说明</Link>
          </li>
        </ul>
      </Paragraph>
    </Typography>
  );
};

export default ReleaseNote;
