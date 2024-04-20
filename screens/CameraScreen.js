import { View, Text} from 'react-native'
import Camera from "../components/Camera.jsx"
import Stats from '../components/Stats.jsx'
import ProfilePicture from '../components/ProfilePicture.jsx'
import Capture from '../components/Capture.jsx'

export default function CameraScreen() {
    return (
      <View className="flex flex-col items-center justify-center bg-red-300">
        <Text>Camera</Text>
        {/* <Capture/> */}
            {/* <Camera/>
            <ProfilePicture/>
            <Stats/> */}
      </View>
    )
  }