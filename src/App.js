import {Container} from '@chakra-ui/layout';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Nav} from './components/Nav';
import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {CompleteProfile} from './pages/user/CompleteProfile';
import {OrgApply} from './pages/user/OrgApply';
import {UserProfile} from './pages/user/UserProfile';

axios.defaults.baseURL = 'http://localhost:5000';

const publicRoutes = [
  {path: '/', component: Home},
  {path: '/login', component: Login},
];

const userRoutes = [
  {path: '/user/complete-profile', component: CompleteProfile},
  {path: '/user/profile', component: UserProfile},
  {path: '/org/apply', component: OrgApply},
];

const App = () => {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container maxW='container.xl'>
      <BrowserRouter>
        <Nav />
        <Switch>
          {publicRoutes.map(r => (
            <Route key={r.path} exact path={r.path} component={r.component} />
          ))}
          {profile &&
            userRoutes.map(r => (
              <Route key={r.path} exact path={r.path} component={r.component} />
            ))}
          <Redirect to='/' />
        </Switch>
      </BrowserRouter>
    </Container>
  );
};

export default App;
