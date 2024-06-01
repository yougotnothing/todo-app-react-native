import { ActivityIndicator, View } from "react-native";

export default function Loader() {
  return (
    <View style={{ 
      width: '100%',
      height: '100%',
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
    }}>
      <ActivityIndicator size="large" color="#646FD4" />
    </View>
  )
}