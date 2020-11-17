import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Screen from './srceen';
import store from './app/store'
export default App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="default" />
      <Screen />
    </Provider>

  )
}