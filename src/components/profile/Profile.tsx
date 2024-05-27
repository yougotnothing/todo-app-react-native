import { observer } from "mobx-react";
import Text from "@templates/Text";
import { UserAvatar, UserAvatarButton } from "./Profile.styled";
import { SvgXml } from "react-native-svg";
import Icons from "@icons";
import Wrapper from "@templates/Wrapper";
import { changeAvatar } from "@store/change-avatar.mobx";
import { useEffect } from "react";
import Button from "@templates/Button";

const Profile = observer(() => {
  useEffect(() => {
    console.log('image: ', changeAvatar.avatar);
  }, [changeAvatar.avatar, changeAvatar.avatarBuffer]);

  return (
    <Wrapper>
      <UserAvatarButton onPress={() => changeAvatar.pickAvatar()}>
        {changeAvatar.avatar ? (
          <UserAvatar
            source={{ uri: changeAvatar.avatar }}
            width={150}
            height={150}
            resizeMode="cover"
          />
        ) : (
          <SvgXml
            xml={Icons["default avatar"]}
            width="150"
            height="150"
          />
        )}
      </UserAvatarButton>
      <Text color="#363636" fontFamily="Jost-Medium" size="large" text="John Doe" />
      <Button text="Apply" onPress={() => changeAvatar.changeAvatar()} />
    </Wrapper>
  )
});

export default Profile;