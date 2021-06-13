import {Container} from '@chakra-ui/layout';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Nav} from './components/Nav';
import {Dashboard} from './pages/admin/Dashboard';
import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {OrgDashboard} from './pages/org/Dashboard';
import {OrgProfile} from './pages/org/OrgProfile';
import {CompleteProfile} from './pages/user/CompleteProfile';
import {OrgApply} from './pages/user/OrgApply';
import {UserProfile} from './pages/user/UserProfile';

axios.defaults.baseURL = 'http://localhost:5000';

const publicRoutes = [{path: '/login', component: Login}];

const userRoutes = [
  {path: '/user/complete-profile', component: CompleteProfile},
  {path: '/user/profile', component: UserProfile},
  {path: '/org/apply', component: OrgApply},
];

const orgRoutes = [
  {path: '/org/profile', component: OrgProfile},
  {path: '/org/dashboard', component: OrgDashboard},
];

const adminRoutes = [{path: '/admin/dashboard', component: Dashboard}];

const App = () => {
  const profile = useSelector(state => state.user.profile);
  const isAdmin = profile && profile?.role === 'admin';
  const isUser = profile && profile?.role === 'user';
  const isOrg = profile && profile?.role === 'org';

  return (
    <BrowserRouter>
      <Nav />
      <Container mt={3} maxW='container.xl'>
        <Switch>
          <Route exact path='/' component={Home} />
          {publicRoutes.map(r => (
            <Route key={r.path} path={r.path} component={r.component} />
          ))}
          {isAdmin &&
            adminRoutes.map(r => (
              <Route key={r.path} path={r.path} component={r.component} />
            ))}
          {isOrg &&
            orgRoutes.map(r => (
              <Route key={r.path} path={r.path} component={r.component} />
            ))}
          {isUser &&
            userRoutes.map(r => (
              <Route key={r.path} path={r.path} component={r.component} />
            ))}
          <Redirect to='/' />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
