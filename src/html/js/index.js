const { Button } = antd;

function MyApp() {
  const [count, setCount] = React.useState(0);
  return <Button style={{ margin: 10 }} type="primary" onClick={() => setCount(count + 1)}>当前：{count}</Button>;
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);
