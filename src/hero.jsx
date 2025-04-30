import { motion } from "framer-motion";
import IMG from './asset/chatbot-icon.png'
import { useNavigate } from 'react-router-dom';



const Hero = () => {
  const navigate = useNavigate(); // ✅ Get navigation function
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-23 " id="hero">
      {/* LEFT SIDE */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 0.8 }}
        className="flex-1 text-center md:text-left"
      >
        <p className="text-sm text-blue-500 mb-4 tracking-widest uppercase">
          Powered by AI
        </p>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-800">
          Meet Your
          <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
            {" "}Smart Assistant
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 md:pr-12">
          ChatbotX helps you automate conversations, instantly assist customers, and skyrocket your business efficiency 24/7.
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/chatbot')}
          className="mt-8 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          Get Started for Free
        </motion.button>
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="flex-1 flex justify-center mb-10 md:mb-0"
      >
        <img 
          src={IMG} 
          alt="Chatbot Icon" 
          className="w-64 h-64 object-contain" 
        />
      </motion.div>
    </section>
  );
};

export default Hero;
