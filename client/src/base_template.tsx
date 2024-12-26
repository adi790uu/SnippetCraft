/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {
  "index.html": {
    file: {
      contents: `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite + React + Tailwind</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.tsx"></script>
    </body>
  </html>
  `,
    },
  },
  "package.json": {
    file: {
      contents: `
  {
    "name": "vite-react-tailwind",
    "version": "0.1.0",
    "type": "module",
    "private": true,
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    },
    "dependencies": {
      "react": "^18.3.1",
      "react-dom": "^18.3.1",
      "lucide-react": "^0.344.0"
    },
    "devDependencies": {
      "@vitejs/plugin-react": "^4.3.1",
      "autoprefixer": "^10.4.18",
      "postcss": "^8.4.35",
      "tailwindcss": "^3.4.1",
      "typescript": "^5.5.3",
      "vite": "^5.4.2"
    }
  }
  `,
    },
  },
  "postcss.config.js": {
    file: {
      contents: `
        export default {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        }
        `,
    },
  },
  "tailwind.config.js": {
    file: {
      contents: `
  /** @type {import('tailwindcss').Config} */
  export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  `,
    },
  },
  "tsconfig.json": {
    file: {
      contents: `
  {
    "compilerOptions": {
      "target": "ES2020",
      "module": "ESNext",
      "jsx": "react-jsx",
      "strict": true,
      "noEmit": true,
      "moduleResolution": "node",
      "isolatedModules": true,
      "skipLibCheck": true
    },
    "include": ["src"]
  }
  `,
    },
  },
  "vite.config.ts": {
    file: {
      contents: `
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  
  export default defineConfig({
    plugins: [react()],
  });
  `,
    },
  },
  src: {
    directory: {
      "main.tsx": {
        file: {
          contents: `
                import { StrictMode } from 'react';
                import { createRoot } from 'react-dom/client';
                import App from './App';
                import './index.css';

                createRoot(document.getElementById('root')!).render(
                  <StrictMode>
                    <App />
                  </StrictMode>
                );
                `,
        },
      },
      "App.tsx": {
        file: {
          contents: `
                import React from 'react';
                import { LucideHome } from 'lucide-react';
                function App() {
                  return (
                    <div className="min-h-screen flex items-center justify-center bg-gray-100">
                      <div className="text-center">
                        <LucideHome className="w-10 h-10 mx-auto mb-4 text-blue-500" />
                        <h1 className="text-2xl font-bold">Welcome to Vite + React + Tailwind</h1>
                        <p className="mt-2 text-gray-600">Start building your app!</p>
                      </div>
                    </div>
                  );
                }
                export default App;
                `,
        },
      },
      "index.css": {
        file: {
          contents: `
                @tailwind base;
                @tailwind components;
                @tailwind utilities;
                `,
        },
      },
    },
  },
};
