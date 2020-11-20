import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Screen from './srceen';
import store from './app/store'
import { MenuProvider } from 'react-native-popup-menu';
export default App = () => {
  return (
    <MenuProvider >
      <Provider store={store}>
        <StatusBar barStyle="default" />
        <Screen />
      </Provider>
    </MenuProvider>
  )
}