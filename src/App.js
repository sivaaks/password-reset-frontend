import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Dashboard from './Dashboard';
import Email from './Email';
import PrivateRoute from './PrivateRoute';
import RedirectOriginal from './RedirectOriginal';

export default function App(){
    return(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/register' component={Register}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/email' component={Email}></Route>
        <Route exact path='/forgot-password' component={ForgotPassword}></Route>
        <Route exact path='/reset-password/:token' component={ResetPassword}></Route>
        <PrivateRoute exact path='/dashboard' component={Dashboard}></PrivateRoute>
        <Route path='/:link' component={RedirectOriginal}></Route>
        </Switch>
    </BrowserRouter>
    )
}