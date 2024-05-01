import Wrapper from "../../templates/components/Wrapper";
import Text from "../../templates/components/Text";
import Button from "../../templates/components/Button";
import NewTask from "../../templates/components/New-task";

export default function CreateTask() {
  return (
    <>
      <NewTask />
      <Wrapper>
        <Text color="#9BA3EB" fontFamily="Jost-Medium" size="large" text="Create task" />
        <Text color="#B9B8FA" fontFamily="Jost-Medium" size="medium" text="Start managing your tasks with Mtodo. Your busy life deserves this. you can manage checklist and your goal." />
        <Button onPress={() => console.log('create task')} text="Create task" />
      </Wrapper>
    </>
  )
}