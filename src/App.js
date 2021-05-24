import {useDispatch} from 'react-redux';
import {login, logout} from './redux/actions/userActions';

const App = () => {
  const dispatch = useDispatch();
  return (
    <div className='App'>
      <button onClick={() => dispatch(login())}>Login</button>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default App;
