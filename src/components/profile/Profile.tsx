import { observer } from "mobx-react";
import Text from "@templates/Text";
import Wrapper from "@templates/Wrapper";
import { changeAvatar } from "@store/change-avatar.mobx";
import { useEffect, useState } from "react";
import Button from "@templates/Button";
import UserAvatar from "@templates/User-avatar";
import { user } from "@store/user.mobx";
import { Navbar } from "./Profile.styled";
import { useNavigation } from "@react-navigation/native";
import { RouterProps } from "router/router.interface";
import BackButton from "@templates/Back-button";
import DrawerMenuButton from "@templates/Drawer-menu-button";
import OptionsDroplist from "@animated/Options-droplist";
import { TransparentButton } from "@templates/Transparent-button";
import { DATE_CONFIG } from "src/config/date.config";
import Loader from "@templates/Loader";

const Profile = observer(() => {
  const [isDroplistOpen, setIsDroplistOpen] = useState<boolean>(false);
  const { navigate, goBack } = useNavigation<RouterProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  

  useEffect(() => {
    user.getUser();
    changeAvatar.setAvatar(user.avatar);
    setIsLoading(false)
  }, []);

  const handlePickAvatar = async () => {
    await changeAvatar.pickAvatar()
                      .then(() => (user.updateAvatar()));                 
    setIsDroplistOpen(false);
  }

  return (
    <Wrapper>
      <Navbar>
        <BackButton color="white" onPress={goBack} disabled={changeAvatar.isFetching || isLoading} />
        <Text color="#fff" fontFamily="Jost-Bold" size="large" text="Profile" />
        <DrawerMenuButton onPress={() => setIsDroplistOpen(!isDroplistOpen)} disabled={changeAvatar.isFetching || isLoading} />
      </Navbar>
      {changeAvatar.isFetching || isLoading ? <Loader /> : (
        <>
          <OptionsDroplist setIsOpen={setIsDroplistOpen} $isOpen={isDroplistOpen}>
            {isDroplistOpen && (
              <>
                <TransparentButton text="Change avatar" onPress={handlePickAvatar} />
                <TransparentButton text="Change name" onPress={() => console.log('change name')} />
                <TransparentButton text="Change email" onPress={() => console.log('change email')} />
                <TransparentButton text="Change password" onPress={() => console.log('change password')} />
                <TransparentButton text="Log out" onPress={() => console.log('log out')} />
              </>
            )}
          </OptionsDroplist>
          <UserAvatar user={user} size={150} onPress={handlePickAvatar} />
          <TransparentButton onPress={() => console.log('change name')} text={user.name} />
        </>
      )}
    </Wrapper>
  )
});

export default Profile;