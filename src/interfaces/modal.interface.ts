import { ReactNode } from "react";

export interface ModalProps {
  isModalVisible: boolean;
  onPressOutside: () => void;
  children: ReactNode;
}