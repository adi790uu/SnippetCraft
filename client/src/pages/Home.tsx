import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const recommendationQuery = [
    "Create me a button.",
    "Create me a Carousel.",
    "Create a Form.",
    "Create a Modal.",
    "Create a Dropdown.",
  ];

  const handleGenerate = async () => {
    setLoading(true);
    const response = await axios.post("http://localhost:8000/api/template", {
      user_query: prompt,
    });
    const { valid_query, template } = response.data;
    setLoading(false);

    if (!valid_query) {
      setError(true);
      return;
    }
    navigate("/builder", { state: { prompt, template } });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white">
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-[150px] opacity-30" />
        <div className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] bg-gradient-to-t from-pink-500 to-orange-400 rounded-full blur-[150px] opacity-30" />
      </div>

      <header className="flex flex-col justify-center items-center z-10 mb-4">
        <h1 className="text-5xl font-bold mb-8 tracking-tight">
          What component would you like to create?
        </h1>
        <p className="text-md text-gray-300 mb-8 font-mono w-1/2 text-center">
          Simplify your development workflow with instantly generated {""}
          <span className="font-semibold underline underline-offset-2">
            components
          </span>
          .
        </p>
      </header>

      <div className="w-full max-w-md z-10 flex flex-col justify-center items-center">
        {error && (
          <div className="relative mb-4 w-fit max-w-md flex items-center justify-between bg-gradient-to-r from-red-600 to-yellow-500 rounded-lg px-5 py-3 shadow-2xl text-white z-10 animate-fade-in">
            {/* Background Glow */}
            <div className="absolute inset-0 blur-lg bg-gradient-to-r from-red-600 via-orange-500 to-yellow-700 opacity-40 rounded-lg"></div>

            <button
              className="absolute top-0 right-2 text-white hover:text-gray-200 font-bold text-lg transition-transform transform hover:scale-110 z-10"
              onClick={() => setError(false)}
            >
              ×
            </button>

            <div className="relative z-10 flex flex-col items-center font-mono">
              <div className="flex items-center mb-2 justify-center">
                <span className="bg-red-700 flex justify-center items-center rounded-full shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01"
                    />
                  </svg>
                </span>
                <h3 className="ml-3 text-md font-semibold tracking-wide">
                  Error
                </h3>
              </div>
              <p className="text-sm font-light text-center">
                We couldn't process your request. Please check the input or try
                again later.
              </p>
            </div>
          </div>
        )}
        <textarea
          id="prompt"
          rows={5}
          placeholder="How can we help you today?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full h-3/4 px-4 py-3 font-mono text-sm rounded-lg bg-slate-900 text-gray-100 border border-slate-400 focus:outline-none resize-none overflow-scroll"
        />

        <button
          className="p-3 rounded-md w-1/4 font-mono bg-gradient-to-r from-pink-500 to-purple-600 mt-3 text-sm text-center"
          onClick={handleGenerate}
        >
          {loading ? <ClipLoader size={14} color="white" /> : "Generate"}
        </button>
      </div>

      <div className="flex flex-wrap text-sm justify-center items-center w-full md:w-3/4 lg:w-1/3 gap-4 mt-12">
        {recommendationQuery.map((data, index) => (
          <button
            key={index}
            className="px-3 py-1 rounded-3xl font-mono  text-gray-300 font-light shadow-md hover:scale-105 transform transition-transform duration-200 hover:shadow-lg border border-slate-400"
          >
            {data}
          </button>
        ))}
      </div>

      <footer className="mt-16 text-center text-gray-400 text-sm z-10"></footer>
    </div>
  );
};

export default Home;
