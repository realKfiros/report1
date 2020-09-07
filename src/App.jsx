import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RTL } from './components/RTL';
import { Header } from './components/header';
import { LoginScreen } from './screens/LoginScreen';
import { MainScreen } from './screens/MainScreen';
import Axios from 'axios';
import { SignIn } from './redux/actions';

function App() {
  const dispatch = useDispatch();
  const { name } = useSelector(store => store.user);

  useEffect(() => {
    componentDidMount();
  }, [])

  async function componentDidMount() {
    let request = await Axios('/user');
    dispatch(SignIn(request.data));
  }

  return (
    <RTL>
      <Header />
      {name ? <MainScreen /> : <LoginScreen />}
    </RTL>
  );
}

export default App;
