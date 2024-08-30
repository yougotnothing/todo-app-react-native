import Icons from "@icons";
import { createTaskModal } from "@store/create-task-modal";
import { searchTasks } from "@store/search-tasks";
import MiniTask from "@templates/Mini-task";
import { BlurView } from "expo-blur";
import { observer } from "mobx-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";
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
  z-index: 120;
  height: max-content;
  position: absolute;
  margin: 0;
  padding: 0;
  background-color: transparent;
  top: 125px;
`;

const TasksPressable = styled.Pressable`
  position: absolute;
  background-color: transparent;
`;

const TasksWrapper = styled(Animated.ScrollView)`
  display: flex;
  flex-direction: column;
  width: 90%;
  gap: 14px;
  border-radius: 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  background-color: white;
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

const Pressable = styled.Pressable`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  align-self: center;
`;

function TasksInput() {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const wrapperHeight = useSharedValue<`${number}%`>(searchTasks.isFocused ? '100%' : '6%');
  const wrapperTop = useSharedValue<number>(searchTasks.isFocused ? 0 : 240);
  const wrapperGap = useSharedValue<number>(searchTasks.isFocused ? 22 : 0);
  const wrapperWidth = useSharedValue<`${number}%`>(searchTasks.isFocused ? '100%' : '85%');
  const tasksWrapperHeight = useSharedValue<`${number}%`>(searchTasks.isFocused ? '100%' : '0%');
  const tasksWrapperMarginBottom = useSharedValue<number>(isInputFocused ? 340 : 60);
  const tasksWrapperPadding = useSharedValue<number>(searchTasks.isFocused ? 7 : 0);
  const inputRef = useRef<TextInput>(null);

  const handlePressOutside = () => {
    if(isInputFocused) {
      setIsInputFocused(false);
    }else{
      searchTasks.setIsFocused(false);
    }

    inputRef.current?.blur();
  }

  const handleExit = () => {
    setIsInputFocused(false);
    searchTasks.setIsFocused(false);
    inputRef.current?.blur();
  }

  const handleChange = (value: string) => {
    if(!searchTasks.isFocused) searchTasks.setIsFocused(true);

    searchTasks.setValue(value);
    searchTasks.getTasksBySubstring(value);
  };

  useEffect(() => {
    wrapperGap.value = searchTasks.isFocused ? 22 : 0;
    wrapperWidth.value = searchTasks.isFocused ? '100%' : '85%';
    wrapperHeight.value = searchTasks.isFocused ? '100%' : '6%';
    wrapperTop.value = searchTasks.isFocused ? 0 : 240;
    tasksWrapperHeight.value = searchTasks.isFocused ? '100%' : '0%';
    tasksWrapperPadding.value = searchTasks.isFocused ? 7 : 0;
    tasksWrapperMarginBottom.value = isInputFocused ? 360 : 40;

    if(!searchTasks.isFocused && !searchTasks.value.trim().length) searchTasks.setTasks([]);
  }, [searchTasks.isFocused, isInputFocused]);

  const tasksWrapperStyle = useAnimatedStyle(() => ({
    height: withTiming(tasksWrapperHeight.value, {
      duration: 600,
      easing: Easing.elastic(1.1),
      reduceMotion: ReduceMotion.System
    }),
    marginBottom: withTiming(tasksWrapperMarginBottom.value, {
      duration: 500,
      easing: Easing.elastic(1.1),
      reduceMotion: ReduceMotion.System
    }),
    padding: withTiming(tasksWrapperPadding.value, {
      duration: 600,
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
    top: withTiming(wrapperTop.value, {
      duration: 400,
      easing: Easing.elastic(1.2),
      reduceMotion: ReduceMotion.System
    }),
    width: withTiming(wrapperWidth.value, {
      duration: 600,
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
          height: "100%",
          width: "100%",
          paddingTop: searchTasks.isFocused ? 60 : 0,
          alignItems: 'center',
          gap: searchTasks.isFocused ? 20 : 0,
        }}
      >
        <Pressable onPress={handlePressOutside} />
        <InputWrapper>
          <SearchIcon>
            <SvgXml xml={Icons["search"]} />
          </SearchIcon>
          <Input
            forwardedAs={TextInput}
            ref={inputRef}
            placeholder="Search tasks"
            placeholderTextColor="#888888"
            value={searchTasks.value}
            onChangeText={handleChange}
            onBlur={() => setIsInputFocused(false)}
            onFocus={() => {
              setIsInputFocused(true);
              searchTasks.setIsFocused(true);
            }}
          />
          {searchTasks.isFocused && (
            <CloseButton onPress={handleExit}>
              <SvgXml xml={Icons["grey back button"]} />
            </CloseButton>
          )}
        </InputWrapper>
        <TasksWrapper onTouchEnd={handlePressOutside} style={tasksWrapperStyle}>
          {searchTasks.tasks.map((task) => (
            <MiniTask key={task.id} {...task} onPress={() => {
              handleExit();
              createTaskModal.setTask(task);
              createTaskModal.open('till from');
            }} />
          ))}
        </TasksWrapper>
      </BlurView>
    </Wrapper>
  )
}

export default observer(TasksInput);