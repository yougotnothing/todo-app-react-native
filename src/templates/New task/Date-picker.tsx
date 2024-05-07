import { createTaskModal } from "@store/create-task-modal.mobx";
import { observer } from "mobx-react";
import DateTimePicker from "react-native-modal-datetime-picker";

interface DatePickerProps {
  type: "till" | "from";
  onCancel: () => void;
  isVisible: boolean;
}

function DatePicker({ type, onCancel, isVisible }: DatePickerProps) {
  const setDateByType = (type: "till" | "from", time: Date): void => {
    if(type === "till") createTaskModal.setTill(time.toLocaleTimeString());
    else createTaskModal.setFrom(time.toLocaleTimeString());
  }

  return <DateTimePicker
      onConfirm={time => setDateByType(type, time)}
      onCancel={onCancel}
      isVisible={isVisible}
      mode="time"
      date={new Date()}
    />
}

export default observer(DatePicker);