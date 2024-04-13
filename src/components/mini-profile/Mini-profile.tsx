import { View } from "react-native-reanimated/lib/typescript/Animated";
import { UserDto } from "../../dto/user.dto";
import { useEffect, useState } from "react";
import { handleGetUser } from "../authentication/functions";
import { DrawerActions, StackActions, StackRouter, useNavigation } from "@react-navigation/native";
import { DefaultAvatar, ReturnButton, RoutesWrapper, UserImage, UserInfo, UserWrapper, Wrapper } from "./Mini-profile.styled";
import { SvgXml } from "react-native-svg";
import Icons from "../../config/enum/icons.enum";
import Text from "../../templates/components/Text";
import { DrawerItem } from "@react-navigation/drawer";

export default function MiniProfile() {
  const [user, setUser] = useState<UserDto | undefined>(undefined); 
  const navigation = useNavigation();
  const routes = [
    { label: "Edit profile", icon: Icons["edit profile"], navigateTo: "Home" },
    { label: "Daily tasks", icon: Icons["daily tasks"], navigateTo: "Home" },
    { label: "Important tasks", icon: Icons["important tasks"], navigateTo: "Home" },
    { label: "Done tasks", icon: Icons["done tasks"], navigateTo: "Home" }
  ];

  useEffect(() => {
    handleGetUser(setUser);
  }, []);

  return (
    <Wrapper>
      <ReturnButton onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
        <SvgXml xml={Icons["return button"]} />
      </ReturnButton>
      <UserWrapper>
        <DefaultAvatar $isHaveAvatar={user && user.isHaveAvatar}>
          <SvgXml
            xml={Icons["default avatar"]}
            width="50"
            height="50"
          />
        </DefaultAvatar>
        <UserImage src={user && user.avatar} $isHaveAvatar={user && user.isHaveAvatar} />
        <UserInfo>
          <Text color="#242F9B" fontFamily="Jost-Medium" size="small" text={user && user.name} />
          <Text color="#888888" fontFamily="Jost-Medium" size="small" text={user && user.email} />
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
    </Wrapper>
  )
}