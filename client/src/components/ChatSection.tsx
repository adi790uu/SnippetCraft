import React, { useState } from "react";
import { ChatMessage } from "./types";

interface ChatSectionProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

const ChatSection: React.FC<ChatSectionProps> = ({
  messages,
  onSendMessage,
}) => {
  const [input, setInput] = useState<string>("");

  const handleSendMessage = () => {
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col space-y-4">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.user === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg shadow-2xl border  ${
                  message.user === "You"
                    ? "bg-blue-600 text-white border-gray-800"
                    : "bg-gray-800 text-white border-gray-800"
                }`}
              >
                <strong>{message.user}: </strong>
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 flex items-center space-x-2 p-2 rounded-lg bg-slate-800 border-t border-gray-700">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
