import { Pressable, PressableProps } from "react-native";
import Animated, { ReduceMotion, useAnimatedStyle, useSharedValue, withTiming, Easing } from "react-native-reanimated";
import styled from "styled-components/native";
import Text from "@templates/Text";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { messageModal } from "@store/message-modal";

const Wrapper = styled(Animated.createAnimatedComponent(Pressable))`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 24px;
	padding: 5px;
	background-color: #fff;
	align-self: center;
	position: absolute;
	height: max-content;
`;

function MessageModal({ ...props }: PressableProps) {
	const wrapperTop = useSharedValue<number>(messageModal.isOpen ? 55 : 0);
	const wrapperWidth = useSharedValue<number | `${number}%`>(messageModal.isOpen ? '100%' : 0);
	const wrapperZindex = useSharedValue<number>(messageModal.isOpen ? 99 : -10);

	useEffect(() => {
		wrapperTop.value = messageModal.isOpen ? 55 : 0;
		wrapperWidth.value = messageModal.isOpen ? '100%' : 0;
		wrapperZindex.value = messageModal.isOpen ? 99 : -10;
	}, [messageModal.isOpen]);

	const animatedStyle = useAnimatedStyle(() => ({
		top: withTiming(wrapperTop.value, {
			duration: 300,
			easing: Easing.elastic(1.2),
			reduceMotion: ReduceMotion.System
		}),
		width: withTiming(wrapperWidth.value, {
			duration: 300,
			easing: Easing.elastic(1.2),
			reduceMotion: ReduceMotion.System
		}),
		zIndex: withTiming(wrapperZindex.value, {
			duration: 300,
			easing: Easing.elastic(1.2),
			reduceMotion: ReduceMotion.System
		}),
	}));

	return (
		<Wrapper style={animatedStyle} onPress={() => messageModal.close()}>
			<Text
				color="black"
				fontFamily="Jost-Medium"
				size="medium"
				text={messageModal.message}
			/>
		</Wrapper>
	)
}

export default observer(MessageModal);