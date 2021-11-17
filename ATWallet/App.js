
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import ATLogo from './assets/ATLogo.js';

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>AT Verifiable Credential Wallet</Text>
          <ATLogo height="44" width="44" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
