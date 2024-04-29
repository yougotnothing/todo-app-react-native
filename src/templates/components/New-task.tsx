import styled from "styled-components/native";
import Text from "./Text";

interface NewTaskProps {
  $isOpen?: boolean;
}

interface TaskProps {
  $type: "new task" | "edit task";
}

const Wrapper = styled.View<NewTaskProps>`
  display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: white;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  position: absolute;
  right: 0;
  top: 0;
  z-index: 999;
`;

const TaskWrapper = styled.View`
  display: flex;
  flex-direction: column;
  padding: 14px;
  border-radius: 16px;
  gap: 20px;
  align-items: center;
  margin-bottom: 24px;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export default function NewTask({ isOpen }: { isOpen: boolean }) {
  return (
    <Wrapper $isOpen={isOpen}>
      <TaskWrapper>
        <Header>
          <Text color="#363636" fontFamily="Jost-Medium" size="small" text="New task" />
          <Text color="#363636" fontFamily="Jost-Medium" size="small" text="Add a new task" />
        </Header>
      </TaskWrapper>
    </Wrapper>
  )
}