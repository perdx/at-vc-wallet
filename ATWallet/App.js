
import React from 'react';

import RootStack from './App/navigators/RootStack';
import AuthProvider from './App/providers/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <RootStack />
    </AuthProvider>
  );
};

export default App;
