import React, { useEffect, useState } from "react";
import ChatSection from "../components/ChatSection";
import { ChatMessage } from "../components/types";
import { useWebContainer } from "../hooks/useWebContainer";
import { PreviewFrame } from "../components/PreviewFrame";
import { TabView } from "../components/TabView";
import { CodeEditor } from "../components/CodeEditor";

const Builder: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [code, setCode] = useState<string>(
    "// Your generated code will appear here..."
  );

  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");

  const webcontainer = useWebContainer();
  const [preview, setPreview] = useState<string>(
    "<div>Preview will render here</div>"
  );

  const handleNewMessage = (message: string) => {
    const newMessages: ChatMessage[] = [
      ...chatMessages,
      { user: "You", text: message },
    ];
    setChatMessages(newMessages);

    setTimeout(() => {
      const botResponse: ChatMessage = {
        user: "Bot",
        text: `Generated component for: ${message}`,
      };
      setChatMessages((prev) => [...prev, botResponse]);

      const simulatedCode = `
      import React from 'react';

      const ${message.replace(/\s+/g, "")} = () => (
        <div>
          <h1>${message}</h1>
        </div>
      );

      export default ${message.replace(/\s+/g, "")};
      `;
      setCode(simulatedCode);
      setPreview(`<div><h1>${message}</h1></div>`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 flex flex-col lg:flex-row">
      <ChatSection messages={chatMessages} onSendMessage={handleNewMessage} />
      {/* <TabSystem code={code} preview={preview} />
       */}
      <div className="w-full bg-gray-900 rounded-lg shadow-lg p-6 h-[calc(100vh-8rem)]">
        <TabView activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="h-[calc(100%-4rem)]">
          {activeTab === "code" ? (
            <CodeEditor file={null} />
          ) : (
            webcontainer && <PreviewFrame webContainer={webcontainer} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Builder;
