import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {ListScreen} from './screen';
import {NavigationRoutes} from './utils';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => {
      showMessage({
        message: error.message,
        backgroundColor: '#18233d',
        style: {
          borderRadius: 8,
          opacity: 0.8,
        },
        duration: 3000,
      });
    },
  }),
});
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
      <FlashMessage position="top" />
    </QueryClientProvider>
  );
}

export default App;
