import { View, Text } from 'react-native'
import Component from '../components/Component'
import Landing from '../components/Landing'
import Info from '../components/Info'
import React from 'react'

export default function HomeScreen() {
  return (
    <View className="flex justify-center">
      <Text>HomeScreen</Text>
      <Landing/>
      <Info/>
      <Component/>
    </View>
  )
}