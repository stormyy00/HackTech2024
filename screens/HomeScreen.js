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
    
<<<<<<< HEAD
    <View className="flex flex-col justify-center mt-2">
=======
    <View className="flex flex-col justify-center bg-[#FBAB7E]">
      {/* <Text>HomeScreen</Text> */}
>>>>>>> 3045f44612a2a3d5a618069085a571d67d55bbb9

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