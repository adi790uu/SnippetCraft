import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleGenerate = async () => {
    console.log("Prompt:", prompt);
    console.log("Description:", description);
    const response = await axios.get("http://localhost:8000/api/template");
    const template = response.data;
    navigate("/builder", { state: { prompt, description, template } });
  };

  return (
    <div className="min-h-screen bg-gray-800 text-gray-200 flex flex-col items-center justify-center p-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-100">
          Craft Your Components
        </h1>
        <p className="text-lg md:text-xl text-gray-400">
          Generate, customize, and preview your React components seamlessly.
        </p>
      </header>

      <div className="rounded-xl p-8 w-full max-w-4xl">
        <div className="mb-6">
          <label
            htmlFor="prompt"
            className="block text-lg font-semibold text-gray-300 mb-2"
          >
            Component Name
          </label>
          <input
            id="prompt"
            type="text"
            placeholder="E.g., Navbar, Button, Card"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-lg font-semibold text-gray-300 mb-2"
          >
            Component Description
          </label>
          <textarea
            id="description"
            placeholder="Describe the component's functionality and appearance..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none h-32 resize-none"
          />
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            onClick={handleGenerate}
            className="w-1/4 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-gray-100 font-bold rounded-lg shadow-md hover:scale-105 transform transition-transform duration-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700"
          >
            Generate Component
          </button>
        </div>
      </div>

      <footer className="mt-16 text-center text-gray-500">
        <p className="text-sm">
          Designed for developers who craft with passion.
        </p>
      </footer>
    </div>
  );
};

export default Home;
