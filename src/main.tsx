import React from 'react';

import HomePage from './features/home/presentation/pages/home/home_page';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import InformationPage from './features/home/presentation/pages/information/information_page';

const Stack = createNativeStackNavigator();

type StackNavitation = {
  Home: undefined;
  Info: undefined;
};

export type StackTypes = NativeStackNavigationProp<StackNavitation>;

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          presentation: 'transparentModal',
        }}>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Info"
          component={InformationPage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
