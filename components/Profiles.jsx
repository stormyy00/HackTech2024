import React from 'react'
import Profile from './Profile'
import { View, Text} from 'react-native'
import { MOCK } from '../data/mock.js'

const Profiles = () => {
  return (
    <View className="mt-3 ">
      <Profile mock={MOCK} />
    </View>
  )
}

// flex: 1,
// backgroundColor: '#FBAB7E',
// alignItems: 'center',
// justifyContent: 'center',

export default Profiles
