import React, { useEffect, useState } from "react";
import ChatSection from "../components/ChatSection";
import { ChatMessage } from "../components/types";
import { useWebContainer } from "../hooks/useWebContainer";
import { PreviewFrame } from "../components/PreviewFrame";
import { TabView } from "../components/TabView";
import { CodeEditor } from "../components/CodeEditor";
import { useLocation } from "react-router-dom";

const Builder: React.FC = () => {
  const location = useLocation();
  const { template } = location.state;

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [code, setCode] = useState<string>(
    "// Your generated code will appear here..."
  );
  const [component, setComponent] = useState({});
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");

  const webcontainer = useWebContainer();
  const [preview, setPreview] = useState<string>(
    "<div>Preview will render here</div>"
  );

  useEffect(() => {
    if (!webcontainer || Object.keys(component).length === 0) return;

    (async () => {
      try {
        await webcontainer.mount(component);
      } catch (error) {
        console.error("Error mounting files:", error);
      }
    })();
  }, [component, webcontainer]);

  const handleNewMessage = (message: string) => {
    const newMessages: ChatMessage[] = [
      ...chatMessages,
      { user: "You", text: message },
    ];
    setChatMessages(newMessages);

    const componentFiles = {
      src: {
        directory: {
          "Button.tsx": {
            file: {
              contents: `
                const Button = ({ label }) => {
                  return (
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      {label}
                    </button>
                  );
                };

                export default Button;
              `,
            },
          },
          "App.tsx": {
            file: {
              contents: `
                  import React from 'react';
                  import Button from './Button';

                  function App() {
                    return (
                      <div className="min-h-screen flex items-center justify-center bg-gray-100">
                        <div className="text-center">
                          <Button label="Start" />
                        </div>
                      </div>
                    );
                  }

                  export default App;
              `,
            },
          },
        },
      },
    };

    setCode(componentFiles.src.directory["Button.tsx"].file.contents);

    setComponent(componentFiles);

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

      <div className="w-full bg-gray-900 rounded-lg shadow-lg p-6 h-[calc(100vh-8rem)]">
        <TabView activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="h-[calc(100%-4rem)]">
          {activeTab === "code" ? (
            <CodeEditor file={code} onChange={setCode} />
          ) : (
            webcontainer && (
              <PreviewFrame webContainer={webcontainer} template={template} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Builder;
