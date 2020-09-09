import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RTL } from './components/RTL';
import { Header } from './components/header';
import { LoginScreen } from './screens/login';
import { MainScreen } from './screens/main';
import Axios from 'axios';
import { SignIn } from './redux/actions';
import { Drawer } from '@material-ui/core';
import { AppDrawer } from './components/app-drawer';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { HistoryScreen } from './screens/history';

function App() {
  const [drawer, setDrawer] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);

  useEffect(() => {
    componentDidMount();
  }, [])

  async function componentDidMount() {
    let request = await Axios('/user');
    dispatch(SignIn(request.data));
  }

  return (
    <RTL>
      <Router>
        <Header openDrawer={() => setDrawer(true)}/>
        <Switch>
          <Route exact path="/" component={user ? MainScreen : LoginScreen} />
          <Route exact path="/history" component={user ? HistoryScreen : LoginScreen} />
        </Switch>
        <Drawer open={drawer} onClose={() => setDrawer(false)} key="right">
          <AppDrawer close={() => setDrawer(false)}/>
        </Drawer>
      </Router>
    </RTL>
  );
}

export default App;
