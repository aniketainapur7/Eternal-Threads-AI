import React from "react";
import Spline from "@splinetool/react-spline";
import { useSignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const LandingPage = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) return null;

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold tracking-wide text-pink-400"
          >
            Eternal Threads
          </motion.h1>
          <nav className="hidden md:flex space-x-8 text-gray-300 font-medium">
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#how" className="hover:text-white transition">
              How It Works
            </a>
            <a href="#explore" className="hover:text-white transition">
              Explore
            </a>
          </nav>
          <button
            onClick={signInWithGoogle}
            className="px-5 py-2 bg-pink-500 hover:bg-pink-400 rounded-lg font-medium shadow-lg"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-8 pt-32 md:pt-40 max-w-7xl mx-auto">
        {/* Left - Text */}
        <motion.div
          className="flex flex-col space-y-6 max-w-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Discover Your <span className="text-pink-400"> Own Style</span>
          </h1>
          <p className="text-lg text-gray-300">
            Welcome to <span className="text-purple-300 font-semibold">Eternal Threads</span>, 
            the world’s first AI-powered{" "}
            <span className="text-pink-400">fashion search engine</span>.  
            Instantly find the perfect T-shirt, sneakers, or accessory across the internet.
          </p>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={signInWithGoogle}
              className="px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-400 transition text-lg font-medium shadow-lg"
            >
              Get Started
            </motion.button>

            <motion.a
              href="#features"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl border border-gray-400 hover:bg-gray-800 transition text-lg font-medium"
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>

        {/* Right - 3D Fashion Model */}
        <motion.div
          className="mt-12 md:mt-0 md:ml-12 flex-1 h-[500px] md:h-[700px] w-100"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Spline scene="https://prod.spline.design/tvAsW9Z5N2zaKkmF/scene.splinecode" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="w-full py-32 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Why Choose Us?</h2>
          <p className="text-lg text-gray-400 mb-16">
            We make fashion discovery simple, fun, and futuristic.
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "AI-Powered Search",
                desc: "Find clothing by text, image, or even mood instantly.",
              },
              {
                title: "Endless Collections",
                desc: "Search across thousands of brands and online stores.",
              },
              {
                title: "Personalized Style",
                desc: "Get recommendations tailored to your fashion DNA.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="p-8 bg-gray-800/50 rounded-2xl shadow-lg"
              >
                <h3 className="text-xl font-semibold text-pink-400 mb-3">
                  {f.title}
                </h3>
                <p className="text-gray-300">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how"
        className="w-full py-32 bg-black text-center flex flex-col items-center"
      >
        <h2 className="text-4xl font-bold mb-6">How It Works</h2>
        <p className="text-lg text-gray-400 max-w-2xl mb-12">
          Upload an image, describe your dream outfit, or just type “white oversized tee” — 
          our AI finds it instantly from multiple stores. Your style, your rules.
        </p>
        <motion.img
          src="https://dummyimage.com/800x400/1a1a1a/ffffff&text=Fashion+Search+Demo"
          alt="Demo"
          className="rounded-xl shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />
      </section>

      {/* CTA Section */}
      <section
        id="explore"
        className="w-full py-32 bg-gradient-to-b from-gray-900 to-black text-center"
      >
        <h2 className="text-4xl font-bold mb-6">Ready to Find Your Style?</h2>
        <p className="text-lg text-gray-400 mb-10">
          Start exploring the future of fashion today.
        </p>
        <button
          onClick={signInWithGoogle}
          className="px-8 py-4 bg-pink-500 hover:bg-pink-400 rounded-xl text-lg font-semibold shadow-lg"
        >
          Get Started Now
        </button>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-gray-800 text-center text-gray-500">
        © {new Date().getFullYear()} StyleFinder. All Rights Reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
