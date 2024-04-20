import { View, Text} from 'react-native'
import Camera from "../components/Camera.jsx"

export default function CameraScreen() {
    return (
      <View className="flex flex-col justify-center bg-red-300">
        <Text>Camera</Text>
            <Camera/>
      </View>
    )
  }