import { TouchableOpacity } from "react-native";
import Text from "./Text";

export const TransparentButton = ({ onPress, text }: { onPress: () => unknown, text: string }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor: "transparent" }}>
      <Text color="#242F9B" size="medium" fontFamily="Jost-Regular" text={text} />
    </TouchableOpacity>
  )
}