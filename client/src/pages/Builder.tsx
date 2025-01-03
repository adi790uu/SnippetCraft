import React, { useEffect, useState } from "react";
import { ChatMessage } from "../components/types";
import { useWebContainer } from "../hooks/useWebContainer";
import { PreviewFrame } from "../components/PreviewFrame";
import { TabView } from "../components/TabView";
import { CodeEditor } from "../components/CodeEditor";
import { useLocation } from "react-router-dom";
import { MessageCircle, Code, Eye } from "lucide-react";
import ChatSection from "../components/ChatSection";

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
    }, 1000);
  };

  return (
    <div className=" text-white flex flex-col">
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        <aside className="lg:w-1/3 w-full p-4  rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <MessageCircle className="w-6 h-6 text-pink-400" />
            <span>Chat</span>
          </h2>
          <div className="overflow-y-auto max-h-[80vh]">
            <ChatSection
              messages={chatMessages}
              onSendMessage={handleNewMessage}
            />
          </div>
        </aside>

        <main className="flex-1 p-6 flex flex-col gap-6 bg-gray-900 rounded-lg shadow-lg">
          <TabView activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex-1 p-3 shadow-md">
            {activeTab === "code" ? (
              <div className="h-full flex flex-col">
                <CodeEditor file={code} onChange={setCode} />
              </div>
            ) : webcontainer ? (
              <PreviewFrame webContainer={webcontainer} template={template} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <Eye className="w-12 h-12 text-gray-500" />
                <p>No Preview Available</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Builder;
