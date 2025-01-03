import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  file: FileItem | null;
  onChange: (newContent: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ file, onChange }) => {
  if (!file) {
    return (
      <div className="min-h-full flex items-center justify-center text-gray-400">
        Select a file to view its contents
      </div>
    );
  }

  return (
    <Editor
      height="100%"
      defaultLanguage="typescript"
      theme="vs-dark"
      value={file.content || ""}
      onChange={(newValue) => {
        if (onChange && newValue !== undefined) {
          onChange(newValue);
        }
      }}
      options={{
        readOnly: false,
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: "on",
        scrollBeyondLastLine: false,
      }}
    />
  );
};
