export interface ChatMessage {
  user: string;
  text: string;
}

export interface TabProps {
  code: string;
  preview: string;
}

export interface ChatSectionProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

export interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
