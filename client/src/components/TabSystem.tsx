import React, { useState } from "react";
import TabButton from "./TabButton";
import { TabProps } from "./types";

const TabSystem: React.FC<TabProps> = ({ code, preview }) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <div className="flex flex-col w-full lg:w-2/3 p-6">
      <div className="flex space-x-4 mb-6">
        <TabButton
          isActive={activeTab === "preview"}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </TabButton>
        <TabButton
          isActive={activeTab === "code"}
          onClick={() => setActiveTab("code")}
        >
          Code
        </TabButton>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl p-6 flex-grow border border-gray-700">
        {activeTab === "preview" ? (
          <div className="h-full">
            <h2 className="text-xl font-bold mb-6 text-gray-100">
              Component Preview
            </h2>
            <div className="w-full h-[calc(100vh-250px)] bg-gray-700/50 rounded-lg p-6 overflow-auto">
              <div
                className="preview-content"
                dangerouslySetInnerHTML={{ __html: preview }}
              />
            </div>
          </div>
        ) : (
          <div className="h-full">
            <h2 className="text-xl font-bold mb-6 text-gray-100">
              Generated Code
            </h2>
            <pre className="w-full h-[calc(100vh-250px)] text-gray-100 font-mono overflow-auto p-6 bg-gray-700/50 rounded-lg">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabSystem;
