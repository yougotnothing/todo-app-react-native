import { TodoDto } from "dto/todo";
import styled from "styled-components/native";
import Text from "@templates/Text";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";

const Task = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  border-radius: 16px;
  gap: 20px;
  z-index: 333;
  background-color: white;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
`;

const MainInfo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 22px;
`;

const TillFrom = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

interface Props extends TodoDto {
  onPress?: () => void;
}

function MiniTask({ ...props }: Props) {
  const validateTypeColor = (type: TodoDto["type"]) => {
    switch(type) {
      case "school": return "#2A8899";
      case "work": return "#5EB0D2";
      case "shop": return "#BE8972";
      case "read": return "#646FD4";
      case "work out": return "#83BC74";
      default: return "#363636";
    }
  }

  return (
    <View
      onStartShouldSetResponder={_ => true}
      onTouchEnd={e => e.stopPropagation()}
    >
      <Task style={{ marginBottom: 20 }} activeOpacity={0.6} onPress={props.onPress}>
        <MainInfo>
          <TillFrom>
            <Text color="#888888" size="small" fontFamily="Jost-Regular" text={props.till} />
            <Text color="#888888" size="small" fontFamily="Jost-Regular" text={props.from} />
          </TillFrom>
          <Text color={validateTypeColor(props.type)} fontFamily="Jost-Medium" size="medium" text={props.header} />
        </MainInfo>
      </Task>
    </View>
  )
}

export default observer(MiniTask);