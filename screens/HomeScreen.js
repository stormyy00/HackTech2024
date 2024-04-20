import { View, Text } from 'react-native'
import Component from '../components/Component'
import Landing from '../components/Landing'
import Info from '../components/Info'
import Profiles from '../components/Profiles'
import React from 'react'
import {SafeAreaView} from 'react-native'
import { MOCK } from '../data/mock.js'


export default function HomeScreen() {
  return (
    
    <View className="flex flex-col justify-center">
      <Text>HomeScreen</Text>

      {/* {
          MOCK.map((item, index) => ( */}

            <Profiles/>
          {/* ))
          } */}

      {/* <Landing/> */}
      {/* <Info/>
      <Component/> */}

    </View>
  )
}