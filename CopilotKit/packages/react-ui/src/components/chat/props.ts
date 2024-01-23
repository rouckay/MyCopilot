import { Message } from "@copilotkit/react-core";

export interface ButtonProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface WindowProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  clickOutsideToClose: boolean;
  hitEscapeToClose: boolean;
  hotkey: string;
  children?: React.ReactNode;
}

export interface HeaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface MessagesProps {
  messages: Message[];
  inProgress: boolean;
}

export interface InputProps {
  inProgress: boolean;
  onSend: (text: string) => void;
  children?: React.ReactNode;
}

export interface ResponseButtonProps {
  onClick: () => void;
  inProgress: boolean;
}
