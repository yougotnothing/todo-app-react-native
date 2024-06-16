import NewTask from "@templates/New-task/New-task";
import { observer } from "mobx-react";

function CreateTask() {

  return (
    <>
      <NewTask />
    </>
  )
}

export default observer(CreateTask);