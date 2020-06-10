import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from "react"
import Following from "./Following"
import Followers from "./Followers"
import Info from "./Info"

const Tab = createMaterialTopTabNavigator();

export default function ProfileTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Info" component={Info} />
      <Tab.Screen name="Following" component={Following} />
      <Tab.Screen name="Followers" component={Followers} />
    </Tab.Navigator>
  );
}