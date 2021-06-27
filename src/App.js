import {Container} from '@chakra-ui/layout';
import axios from 'axios';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Nav} from './components/Nav';
import {Dashboard} from './pages/admin/Dashboard';
import {BloodProvide} from './pages/BloodProvide';
import {BloodTest} from './pages/BloodTest';
import {DocDashboard} from './pages/doctor/DocDashboard';
import {DocProfile} from './pages/doctor/DocProfile';
import {Doctors} from './pages/Doctors';
import {Emergency} from './pages/Emergency';
import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {OrgDashboard} from './pages/org/Dashboard';
import {OrgProfile} from './pages/org/OrgProfile';
import {CompleteProfile} from './pages/user/CompleteProfile';
import {JoinAsDoctor} from './pages/user/JoinAsDoctor';
import {OrgApply} from './pages/user/OrgApply';
import {UserProfile} from './pages/user/UserProfile';
import {Vaccines} from './pages/Vaccines';
import {fetchProfile} from './redux/actions/user/userActions';

axios.defaults.baseURL = 'http://localhost:5000';

const publicRoutes = [
  {path: '/login', component: Login},
  {path: '/', exact: true, component: Home},
];

const userRoutes = [
  {path: '/', exact: true, component: Home},
  {path: '/user/complete-profile', component: CompleteProfile},
  {path: '/user/profile', component: UserProfile},
  {path: '/org/apply', component: OrgApply},
  {path: '/doctor/join', component: JoinAsDoctor},
  {path: '/vaccines', component: Vaccines},
  {path: '/doctors', component: Doctors},
  {path: '/emergency', component: Emergency},
  {path: '/blood', component: BloodProvide},
  {path: '/blood_test', component: BloodTest},
];

const doctorRoutes = [
  {path: '/doc/profile', component: DocProfile},
  {path: '/doc/dashboard', component: DocDashboard},
];

const orgRoutes = [
  {path: '/org/profile', component: OrgProfile},
  {path: '/org/dashboard', component: OrgDashboard},
];

const adminRoutes = [{path: '/admin/dashboard', component: Dashboard}];

const App = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const isAdmin = profile && profile?.role === 'admin';
  const isUser = profile && profile?.role === 'user';
  const isOrg = profile && profile?.role === 'org';
  const isDoctor = profile && profile?.role === 'doctor';

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Nav />
      <Container mt={3} maxW='container.xl'>
        <Switch>
          {!profile && publicRoutes.map(r => <Route key={r.path} {...r} />)}
          {isAdmin && adminRoutes.map(r => <Route key={r.path} {...r} />)}
          {isOrg && orgRoutes.map(r => <Route key={r.path} {...r} />)}
          {isDoctor && doctorRoutes.map(r => <Route key={r.path} {...r} />)}
          {isUser && userRoutes.map(r => <Route key={r.path} {...r} />)}
          {(!profile || isUser) && <Redirect to='/' />}
          {isOrg && <Redirect to='/org/dashboard' />}
          {isDoctor && <Redirect to='/doc/dashboard' />}
          {isAdmin && <Redirect to='/admin/dashboard' />}
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
