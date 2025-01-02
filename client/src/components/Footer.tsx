const Footer = () => {
  return (
    <div className="relative w-full py-4">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/40 to-gray-700/50 backdrop-blur-2xl border border-gray-500/30 shadow-[0px_4px_20px_rgba(0,0,0,0.4)] opacity-90" />

      <div className="absolute inset-0 bg-gradient-to-br from-purple-800/10 to-blue-600/10 mix-blend-overlay pointer-events-none" />

      <p className="relative text-center text-gray-200 font-mono text-sm z-10 tracking-wide">
        Crafted with precision for developers who value creativity and quality.
      </p>
    </div>
  );
};

export default Footer;
