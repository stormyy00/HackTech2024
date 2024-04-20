import { View, Text} from 'react-native'
import Camera from "../components/Camera.jsx"
import Stats from '../components/Stats'
import ProfilePicture from '../components/ProfilePicture.jsx'
import Capture from '../components/Capture.jsx'
import Upload from '../components/Upload.jsx'

export default function CameraScreen() {
    return (
      <View className="flex flex-col items-center justify-center bg-[#FBAB7E]">
        {/* <Text>Camera</Text> */}
        {/* <Capture/> */}

             {/* <Camera/> */}
            <ProfilePicture/>
            <Stats/>
      </View>
    )
  }