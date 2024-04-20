import React from 'react'
import Profile from './Profile'
import { View, Text} from 'react-native'
import { MOCK } from '../data/mock.js'

const Profiles = () => {
  return (
    <View>
      <Profile mock={MOCK} />
    </View>
  )
}

export default Profiles
