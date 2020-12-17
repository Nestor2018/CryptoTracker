import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';

import colors from './src/resources/colors';
import CoinsStack from './src/components/coins/CoinsStack';
import FavoritesStack from './src/components/favorites/FavoritesStack';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          tintColor: '#fefefe',
          style: {
            backgroundColor: colors.blackPearl,
          },
        }}>
        <Tabs.Screen
          component={CoinsStack}
          name="Coins"
          options={{
            tabBarIcon: ({size, color}) => (
              <Image
                source={require('./src/assets/bank.png')}
                style={{tintColor: color, width: size, height: size}}
              />
            ),
          }}
        />
        <Tabs.Screen
          component={FavoritesStack}
          name="Favorites"
          options={{
            tabBarIcon: ({size, color}) => (
              <Image
                source={require('./src/assets/star.png')}
                style={{tintColor: color, width: size, height: size}}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
