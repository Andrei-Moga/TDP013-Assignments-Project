import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';

//Redux
import {Provider} from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import {loadUser} from './actions/auth';
import store from './store';
import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () =>{
  //keep running when the state updates
  useEffect(()=> {
    store.dispatch(loadUser());
  }, []);
  return (
<Provider store = {store}>
  <Router>
    <Fragment>
      <Navbar/>
      <Route exact path='/' component={Landing}/>
      <section className = "container">
        <Alert/>
        <Switch>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/profiles" component={Profiles}/>
          <Route exact path="/profile/:id" component={Profile}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
        </Switch>
      </section>
    </Fragment>
  </Router>
</Provider>
)};


export default App;
