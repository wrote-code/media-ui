const { Button, Table, Input } = antd;

function MyApp() {
  const [count, setCount] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [name, setName] = React.useState('');

  const dSetData = _.debounce(setData, 1000);

  React.useEffect(() => {
    axios.post('http://localhost:9000/album/queryAlbumList', {
      params: {
        name,
      },
    }).then(r => {
      if (r.data.success) {
        dSetData(r.data.data);
      }
    });
  });

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
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
  ];

  return (
    <React.Fragment>
      <div>
        <Input style={{ width: 500, margin: 10 }} onChange={(e) => setName(e.target.value)} value={name} allowClear />
      </div>
      <Button style={{ margin: 10 }} type="primary" onClick={() => setCount(count + 1)}>当前：{count}</Button>
      <Table rowKey="id" columns={columns} dataSource={data} />
    </React.Fragment>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);
