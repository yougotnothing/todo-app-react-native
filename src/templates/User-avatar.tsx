import Icons from "@icons";
import { UserDto } from "dto/user.dto";
import { observer } from "mobx-react";
import { Image, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";

interface UserAvatarProps {
  user: UserDto;
  size: number;
  onPress?: () => void;
}

const UserAvatar = observer(({ user, size, onPress }: UserAvatarProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      {user.isHaveAvatar ? (
        <Image
          source={{ uri: user.avatar }}
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