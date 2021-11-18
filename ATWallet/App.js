
import React from 'react';

import ListCredentials from './App/screens/ListCredentials';
import MainView from './App/layout/MainView';

// TODO: Use react-navigation, set up navigators

const App = () => {
  return (
    <MainView>
      <ListCredentials />
    </MainView>
  );
};

export default App;
