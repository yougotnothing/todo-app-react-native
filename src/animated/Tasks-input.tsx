import Icons from "@icons";
import { InputProps } from "@interfaces/input";
import { searchTasks } from "@store/search-tasks";
import { BlurView } from "expo-blur";
import { observer } from "mobx-react";
import { useEffect } from "react";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import styled from "styled-components/native";

const Wrapper = styled(Animated.View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  align-self: center;
  width: 100%;
  z-index: 9999;
  margin: 0;
`;

const TasksWrapper = styled(Animated.ScrollView)`
  display: flex;
  flex-direction: column;
  gap: 82px;
  width: 90%;
  border-radius: 18px;
  box-shadow: 0px 12px 20px black;
`;

const InputWrapper = styled.View`
  display: flex;
  flex-direction: row;
  position: relative;
  align-self: center;
  background-color: transparent;
  border-radius: 12px;
`;

const SearchIcon = styled.View`
  position: absolute;
  left: 16px;
  align-self: center;
  z-index: 999;
`;

const Input = styled.TextInput`
  align-self: center;
  display: flex;
  background-color: white;
  border-radius: 14px;
  padding: 8px 16px 8px 48px;
  font-size: 17px;
  height: 48px;
  width: 90%;
  color: #888888;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
`;

function TasksInput({ onChange, value }: InputProps) { 
  const wrapperHeight = useSharedValue<`${number}%`>(searchTasks.isFocused ? '100%' : '6%');
  const wrapperPosition = useSharedValue<'relative' | 'absolute'>(searchTasks.isFocused ? 'absolute' : 'relative');
  const wrapperTop = useSharedValue<number>(searchTasks.isFocused ? 0 : 5);
  const wrapperGap = useSharedValue<number>(searchTasks.isFocused ? 22 : 0);
  const wrapperWidth = useSharedValue<`${number}%`>(searchTasks.isFocused ? '100%' : '85%');
  const color = useSharedValue<string>(searchTasks.isFocused ? 'white' : 'transparent');
  const tasksWrapperHeight = useSharedValue<`${number}%`>(searchTasks.isFocused ? '40%' : '0%');

  useEffect(() => {
    wrapperHeight.value = searchTasks.isFocused ? '100%' : '6%';
    tasksWrapperHeight.value = searchTasks.isFocused ? '40%' : '0%';
    wrapperTop.value = searchTasks.isFocused ? -270 : 5;
    wrapperPosition.value = searchTasks.isFocused ? 'absolute' : 'relative';
    wrapperGap.value = searchTasks.isFocused ? 22 : 0;
    wrapperWidth.value = searchTasks.isFocused ? '100%' : '85%';
    color.value = searchTasks.isFocused ? 'white' : 'transparent';
  }, [searchTasks.isFocused]);

  const tasksWrapperStyle = useAnimatedStyle(() => ({
    maxHeight: withTiming(tasksWrapperHeight.value, {
      duration: 400,
      easing: Easing.elastic(1.4),
      reduceMotion: ReduceMotion.System
    }),
    backgroundColor: withTiming(color.value, {
      duration: 200,
      easing: Easing.elastic(1.2),
      reduceMotion: ReduceMotion.System
    })
  }));
  const wrapperStyle = useAnimatedStyle(() => ({
    height: withTiming(wrapperHeight.value, {
      duration: 1,
      easing: Easing.elastic(0),
      reduceMotion: ReduceMotion.System
    }),
    position: withTiming(wrapperPosition.value, {
      duration: 100,
      easing: Easing.elastic(0),
      reduceMotion: ReduceMotion.System
    }),
    top: withTiming(wrapperTop.value, {
      duration: 400,
      easing: Easing.elastic(1.2),
      reduceMotion: ReduceMotion.System
    }),
    width: withTiming(wrapperWidth.value, {
      duration: 400,
      easing: Easing.elastic(1.4),
      reduceMotion: ReduceMotion.System
    })
  }));

  return (
    <Wrapper style={wrapperStyle}>
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={searchTasks.isFocused ? 30 : 0}
        style={{
          display: 'flex',
          flexDirection: "column",
          alignItems: "center",
          paddingTop: searchTasks.isFocused ? 120 : 0,
          margin: 0,
          height: "100%",
          gap: 26,
          width: "100%",
          backgroundColor: "transparent",
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 999
        }}
      >
      <InputWrapper>
        <SearchIcon>
          <SvgXml xml={Icons["search"]} />
        </SearchIcon>
        <Input
          placeholder="Search tasks"
          placeholderTextColor="#888888"
          value={value}
          onChangeText={onChange}
          onBlur={() => searchTasks.setIsFocused(false)}
          onFocus={() => searchTasks.setIsFocused(true)}
        />
      </InputWrapper>
      <TasksWrapper style={tasksWrapperStyle}>

      </TasksWrapper>
      </BlurView>
    </Wrapper>
  )
}

export default observer(TasksInput);