import { WebContainer } from "@webcontainer/api";
import { useEffect, useState } from "react";

interface PreviewFrameProps {
  webContainer: WebContainer;
  template: any;
}

export function PreviewFrame({ webContainer, template }: PreviewFrameProps) {
  // In a real implementation, this would compile and render the preview
  const [url, setUrl] = useState("");
  async function main() {
    await webContainer.mount(template);
    const installProcess = await webContainer.spawn("npm", ["install"]);
    await installProcess.exit;

    const runningProcess = await webContainer.spawn("npm", ["run", "dev"]);

    runningProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(data);
        },
      })
    );

    // Wait for `server-ready` event
    webContainer.on("server-ready", (port, url) => {
      // ...
      console.log(url);
      console.log(port);
      setUrl(url);
    });
  }

  useEffect(() => {
    main();
  }, []);
  return (
    <div className="h-full w-full flex items-center justify-center text-gray-400">
      {!url && (
        <div className="text-center">
          <p className="mb-2">Loading...</p>
        </div>
      )}
      {url && <iframe width={"100%"} style={{ height: "100%" }} src={url} />}
    </div>
  );
}
