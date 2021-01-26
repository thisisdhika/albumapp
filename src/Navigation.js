import * as React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

/**
 * Screens
 */
import HomeScreen from './screens/Home'
import DetailScreen from './screens/Detail'
import { Text, View } from 'react-native'

/**
 * Theme Configuration
 */
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    secondary: 'rgb(28, 28, 30)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    textLight: 'rgb(255, 255, 255)',
    border: 'rgb(199, 199, 204)',
  },
}

const Stack = createStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          title: 'Photo Album',
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ route }) => ({
            headerBackTitle: 'Albums',
            headerTitle: props => (
              <View {...props}>
                <Text
                  style={{
                    width: '70%',
                    fontSize: 16,
                    fontWeight: '600',
                    alignSelf: 'center',
                    textAlign: 'center',
                    textTransform: 'capitalize',
                  }}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {route.params.album.title}
                </Text>
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
