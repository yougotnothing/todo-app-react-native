import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
  ReturnButton,
  RoutesWrapper,
  UserInfo,
  UserWrapper,
  Wrapper
} from "./Mini-profile.styled";
import { SvgXml } from "react-native-svg";
import Icons from "@icons";
import Text from "@templates/Text";
import { DrawerItem } from "@react-navigation/drawer";
import { user } from "@store/user";
import { RouterProps } from "router/router.interface";
import TransparentButton from "@templates/Transparent-button";
import UserAvatar from "@templates/User-avatar";
import { observer } from "mobx-react";

function MiniProfile() {
  const navigation = useNavigation<RouterProps>();
  const routes = [
    { label: "Edit profile", icon: Icons["edit profile"], navigateTo: "Profile" },
    { label: "Daily tasks", icon: Icons["daily tasks"], navigateTo: "Daily tasks" },
    { label: "Important tasks", icon: Icons["important tasks"], navigateTo: "Home" },
    { label: "Done tasks", icon: Icons["done tasks"], navigateTo: "Home" }
  ];

  const handleLogout = async () => {
    await user.logout();
    navigation.navigate('Log in');
    navigation.setOptions({ canGoBack: false });
  }

  return (
    <Wrapper>
      <ReturnButton onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
        <SvgXml xml={Icons["blue back button"]} />
      </ReturnButton>
      <UserWrapper>
        <UserAvatar user={user} size={50} onPress={() => navigation.navigate('Profile')}
        />
        <UserInfo>
          <Text color="#242F9B" fontFamily="Jost-Medium" size="small" text={user.name} />
          <Text color="#888888" fontFamily="Jost-Medium" size="small" text={user.email} />
        </UserInfo>
      </UserWrapper>
      <SvgXml style={{ alignSelf: 'center' }} height="3" width="100%" xml={Icons["line"]} />
      <RoutesWrapper>
        {routes.map((item, index) => (
          <DrawerItem
            key={index}
            label={item.label}
            icon={() => <SvgXml xml={item.icon} />}
            onPress={() => navigation.navigate(item.navigateTo)}
          />
        ))}
      </RoutesWrapper>
      <TransparentButton
        style={{ 
          marginTop: "auto",
          marginLeft: 10,
          marginRight: "auto"
        }}
        onPress={handleLogout}
        text="Log out"
      />
    </Wrapper>
  )
}

export default observer(MiniProfile);