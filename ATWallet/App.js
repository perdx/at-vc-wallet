
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import VCListItem from './credential/VCListItem';
import MainView from './layout/MainView';

const App = () => {
  return (
    <MainView>
      <FlatList
        data={[{ key: 'MyAT', name: 'MyAT' }]}
        renderItem={
          ({ item }) => <VCListItem vcName={item.name} />
        }
      />
    </MainView>
  );
};

export default App;
