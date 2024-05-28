import Icons from "@icons";
import { observer } from "mobx-react";
import { Image, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";

interface UserAvatarProps {
  avatar: string;
  isHaveAvatar: boolean;
  size: number;
  onPress?: () => void;
}

const UserAvatar = observer(({ avatar, isHaveAvatar, size, onPress }: UserAvatarProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {isHaveAvatar ? (
        <Image
          source={{ uri: avatar }}
          width={size}
          height={size}
          borderRadius={size}
          resizeMode="cover"
        />
      ) : (
        <SvgXml
          xml={Icons["default avatar"]}
          width={size}
          height={size}
        />
      )}
    </TouchableOpacity>
  )
});

export default UserAvatar;