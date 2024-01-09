import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ListScreen} from './screen';
import {NavigationRoutes} from './utils';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={NavigationRoutes.LIST}
            component={ListScreen}
            options={{title: 'Список персонажей'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
