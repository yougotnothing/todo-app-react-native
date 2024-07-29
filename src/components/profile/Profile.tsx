import { observer } from "mobx-react";
import Text from "@templates/Text";
import Wrapper from "@templates/Wrapper";
import { changeAvatar } from "@store/change-avatar";
import { useEffect, useState } from "react";
import UserAvatar from "@templates/User-avatar";
import { user } from "@store/user";
import { TextRow, UserInfo, UserNameInput } from "./Profile.styled";
import { useNavigation } from "@react-navigation/native";
import { RouterProps } from "router/router.interface";
import BackButton from "@templates/Back-button";
import DrawerMenuButton from "@templates/Drawer-menu-button";
import OptionsDroplist from "@animated/Options-droplist";
import TransparentButton from "@templates/Transparent-button";
import Loader from "@templates/Loader";
import { tasks } from "@store/tasks";
import { Platform } from "react-native";
import Navbar from "@templates/Navbar";

function Profile() {
  const [userName, setUserName] = useState<string>(user.name);
  const [isDroplistOpen, setIsDroplistOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigation = useNavigation<RouterProps>();

  useEffect(() => {
    user.getUser();
    changeAvatar.setAvatar(user.avatar);
    tasks.getTasksLength();
    setIsLoading(false);

    console.log("user: ", user);
  }, []);

  useEffect(() => {
    if(!user.isLoggedIn) {
      navigation.navigate('Log in', { goBack: false });
    }
  }, [user.isLoggedIn]);

  const handlePickAvatar = async () => {
    await changeAvatar.pickAvatar()
                      .then(() => (user.updateAvatar()));               
    setIsDroplistOpen(false);
  }

  const handleDrawerMenuClick = () => (setIsDroplistOpen(!isDroplistOpen));

  return (
    <Wrapper>
      <Navbar
        header="Profile"
        buttons={[
          <BackButton color="white" onPress={() => navigation.goBack()} disabled={changeAvatar.isFetching || isLoading} />,
          <DrawerMenuButton onPress={handleDrawerMenuClick} disabled={changeAvatar.isFetching || isLoading} />
        ]}
      />
      {changeAvatar.isFetching || isLoading ? <Loader /> : (
        <>
          <OptionsDroplist setIsOpen={setIsDroplistOpen} $isOpen={isDroplistOpen}>
            {isDroplistOpen && (
              <>
                <TransparentButton text="Change avatar" onPress={handlePickAvatar} />
                <TransparentButton text="Change name" onPress={() => navigation.navigate('Change name')} />
                <TransparentButton text="Change email" onPress={() => console.log('change email')} />
                <TransparentButton text="Change password" onPress={() => navigation.navigate('Change password')} />
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
              <Text color="#363636" fontFamily="Jost-Regular" size="medium" text="email:" />
              <Text color="#646FD4" fontFamily="Jost-Regular" size="medium" text={user.email} />
            </TextRow>
            {!user.isVerified && (
              <TextRow>
                <Text color="#363636" fontFamily="Jost-Regular" size="medium" text="your email is not verified:" />
                <TransparentButton text="verify email" onPress={() => navigation.navigate('Verify email')} />
              </TextRow>
            )}
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