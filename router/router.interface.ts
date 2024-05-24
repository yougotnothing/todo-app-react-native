import { NavigationProp } from "@react-navigation/native";

export type RouterProps = Omit<NavigationProp<any, any>, "state">;
