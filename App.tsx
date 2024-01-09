import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ListScreen} from './screen';
import {NavigationRoutes} from './utils';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={NavigationRoutes.LIST} component={ListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
