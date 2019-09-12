import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CollectionScreen from "../screens/CollectionScreen";
import QuestionScreen from "../screens/QuestionScreen";
import {theme} from "../constants/Colors";
import AddCollectionScreen from "../screens/AddCollectionScreen";
import AddQuestionScreen from "../screens/AddQuestionScreen";
import TabBar from "../components/TabBar";

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: theme.background,
            },
            headerTintColor: theme.textColor,
        }
    },
});

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        Collection: CollectionScreen,
        Question: QuestionScreen,
        AddCollection: AddCollectionScreen,
        AddQuestion: AddQuestionScreen
    },
    config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list${focused ? '' : '-outline'}`
          : 'md-list'
      }
    />
  ),
};

HomeStack.path = '';
/**
 *
 * LinksStack is NOT USED.
 * Removed at the bottom of the file.
 *
 */
const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator(
    {
        HomeStack,
        // LinksStack,
        SettingsStack,
    },
    {
        tabBarComponent: props => <TabBar {...props} />,
    },);

tabNavigator.path = '';

export default tabNavigator;
