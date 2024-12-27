import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { ChatSectionProps, ChatMessage } from "./types";

const ChatSection: React.FC<ChatSectionProps> = ({
  messages,
  onSendMessage,
}) => {
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      onSendMessage(currentMessage);
      setCurrentMessage("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col w-full lg:w-1/2">
      <div className=" backdrop-blur-sm shadow-xl p-6 h-full">
        <h2 className="text-xl font-bold mb-6 text-gray-100">Chat Interface</h2>
        <div className="overflow-y-auto h-[calc(100vh-300px)] mb-4 space-y-4">
          {messages.map((message: ChatMessage, index: number) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.user === "You"
                  ? "bg-blue-600/20 ml-4"
                  : "bg-gray-700/50 mr-4"
              }`}
            >
              <p className="font-semibold text-sm text-gray-300 mb-1">
                {message.user}
              </p>
              <p className="text-gray-100">{message.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto">
          <input
            type="text"
            value={currentMessage}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCurrentMessage(e.target.value)
            }
            onKeyDown={handleKeyPress}
            className="w-full px-4 py-3 bg-gray-700/50 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="Type a component description..."
          />
          <button
            onClick={handleSendMessage}
            className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200 font-semibold"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
