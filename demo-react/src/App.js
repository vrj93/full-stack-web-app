import { useRoutes } from 'react-router-dom';
import CreateUser from './CreateUser';
import GetUser from './GetUser';

function App() {
  const routes = useRoutes([
    { path: '/', element: <CreateUser /> },
    { path: '/users', element: <GetUser /> },
  ]);

  return routes;
}

export default App;
