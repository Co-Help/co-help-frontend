import {Container} from '@chakra-ui/layout';
import axios from 'axios';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Nav} from './components/Nav';
import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {CompleteProfile} from './pages/user/CompleteProfile';
import {OrgApply} from './pages/user/OrgApply';
import {UserProfile} from './pages/user/UserProfile';

axios.defaults.baseURL = 'http://localhost:5000';

const AuthRoutes = [
  {path: '/', component: Home},
  {path: '/login', component: Login},
];
const UserRoutes = [
  {path: '/user/complete-profile', component: CompleteProfile},
  {path: '/user/profile', component: UserProfile},
  {path: '/org/apply', component: OrgApply},
];

const App = () => {
  return (
    <Container maxW='container.xl'>
      <BrowserRouter>
        <Nav />
        <Switch>
          {AuthRoutes.map(r => (
            <Route key={r.path} exact path={r.path} component={r.component} />
          ))}
          {UserRoutes.map(r => (
            <Route key={r.path} exact path={r.path} component={r.component} />
          ))}
        </Switch>
      </BrowserRouter>
    </Container>
  );
};

export default App;
