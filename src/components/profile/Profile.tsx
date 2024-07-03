import { observer } from "mobx-react";
import Text from "@templates/Text";
import Wrapper from "@templates/Wrapper";
import { changeAvatar } from "@store/change-avatar";
import { useEffect, useState } from "react";
import UserAvatar from "@templates/User-avatar";
import { user } from "@store/user";
import { Navbar, TextRow, UserInfo, UserNameInput } from "./Profile.styled";
import { useNavigation } from "@react-navigation/native";
import { RouterProps } from "router/router.interface";
import BackButton from "@templates/Back-button";
import DrawerMenuButton from "@templates/Drawer-menu-button";
import OptionsDroplist from "@animated/Options-droplist";
import TransparentButton from "@templates/Transparent-button";
import Loader from "@templates/Loader";
import { tasks } from "@store/tasks";
import { Platform } from "react-native";

function Profile() {
  const [userName, setUserName] = useState<string>(user.name);
  const [isDroplistOpen, setIsDroplistOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { navigate, goBack, dispatch } = useNavigation<RouterProps>();

  useEffect(() => {
    user.getUser();
    changeAvatar.setAvatar(user.avatar);
    tasks.getTasksLength();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if(!user.isLoggedIn) {
      navigate('Log in', { goBack: false });
    }
  }, [user.isLoggedIn]);

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
                <TransparentButton text="Change name" onPress={() => navigate('Change name')} />
                <TransparentButton text="Change email" onPress={() => console.log('change email')} />
                <TransparentButton text="Change password" onPress={() => navigate('Change password')} />
                <TransparentButton text="Log out" onPress={() => user.logout('clear')} />
              </>
            )}
          </OptionsDroplist>
          <UserAvatar user={user} size={150} onPress={handlePickAvatar} />
          <UserNameInput
            value={userName}
            onSubmitEditing={(name) => user.changeName(name.nativeEvent.text)}
            onChangeText={(name) => setUserName(name)}
          />
          <UserInfo style={
            Platform.OS === 'android' && {
              elevation: 14,
              shadowColor: '#000',
            }
          }>
            <TextRow>
              <Text color="#363636" fontFamily="Jost-Regular" size="medium" text="id:" />
              <Text color="#646FD4" fontFamily="Jost-Regular" size="medium" text={user.id.toString()} />
            </TextRow>
            <TextRow>
              <Text color="#363636" fontFamily="Jost-Regular" size="medium" text="email:" />
              <Text color="#646FD4" fontFamily="Jost-Regular" size="medium" text={user.email} />
            </TextRow>
            {Object.entries(tasks.tasksLength).map(([key, value], index) => (
              <TextRow key={index}>
                <Text color="#363636" fontFamily="Jost-Regular" size="medium" text={`${key} tasks:`} />
                <Text color="#646FD4" fontFamily="Jost-Regular" size="medium" text={value.toString()} />
              </TextRow>
            ))}
          </UserInfo>
        </>
      )}
    </Wrapper>
  )
};

export default observer(Profile);