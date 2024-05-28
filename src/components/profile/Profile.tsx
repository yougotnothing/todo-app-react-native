import { observer } from "mobx-react";
import Text from "@templates/Text";
import Wrapper from "@templates/Wrapper";
import { changeAvatar } from "@store/change-avatar.mobx";
import { useEffect } from "react";
import Button from "@templates/Button";
import UserAvatar from "@templates/User-avatar";
import { user } from "@store/user.mobx";
import { Navbar } from "./Profile.styled";
import { useNavigation } from "@react-navigation/native";
import { RouterProps } from "router/router.interface";

const Profile = observer(() => {
  const navigation = useNavigation<RouterProps>();

  const handleChangeAvatar = async () => {
    await changeAvatar.changeAvatar();
    navigation.navigate('Root');
    await user.getUser();
  }

  useEffect(() => {
    changeAvatar.setAvatar(user.avatar);
  }, []);

  return (
    <Wrapper>
      <Navbar></Navbar>
      <UserAvatar
        avatar={changeAvatar.avatar}
        isHaveAvatar={user.isHaveAvatar}
        size={150}
        onPress={() => changeAvatar.pickAvatar()}
      />
      <Text color="#363636" fontFamily="Jost-Medium" size="large" text="John Doe" />
      <Button text="Apply" onPress={handleChangeAvatar} disabled={changeAvatar.isFetching} />
    </Wrapper>
  )
});

export default Profile;