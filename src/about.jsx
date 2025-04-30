import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, MessageCircle, Zap, Users, CheckCircle } from 'lucide-react';

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const missionVariants = {
    hidden: { opacity: 0, x: -50 }, // From left
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  const visionVariants = {
    hidden: { opacity: 0, x: 50 }, // From right
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  return (
    <section className="py-13 px-6 md:px-20" id="about" style={{ overflowX: 'hidden' }}>
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }} // Make sure it happens every time it comes into view
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 py-2"
          >
            About ChatbotX - Revolutionizing Customer Engagement
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-700 text-lg md:text-xl leading-relaxed"
          >
            At ChatbotX, we're driven by a passion to transform how businesses connect with their customers. We believe that every interaction is an opportunity to build stronger relationships, and our cutting-edge AI-powered chatbot is engineered to make that vision a reality. We go beyond simple automation; we create meaningful conversations.
          </motion.p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-12">
            <motion.div
              variants={missionVariants} // Use missionVariants
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }} // Animate every time in view
              className="p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 w-full md:w-auto flex flex-col items-center sm:items-start gap-4 text-center sm:text-left" // Stack on small, align on larger
            >
              <div className="flex justify-center">
                <Rocket className="w-8 h-8 text-blue-500 flex-shrink-0 mb-2 sm:mb-0" /> {/* Icon on top on small */}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
                <p className="text-gray-600">
                  To empower businesses with intelligent communication solutions that enhance customer satisfaction and drive growth.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={visionVariants} // Use visionVariants
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}// Animate every time in view
              className="p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 w-full md:w-auto flex flex-col items-center sm:items-start gap-4 text-center sm:text-left"  // Stack on small, align on larger
            >
               <div className="flex justify-center">
                <MessageCircle className="w-8 h-8 text-purple-500 flex-shrink-0 mb-2 sm:mb-0" />  {/* Icon on top on small */}
               </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Vision</h3>
                <p className="text-gray-600">
                  To be the leading provider of AI-driven conversational experiences, setting the standard for seamless and personalized customer interactions.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mt-12">
            <h4 className="text-2xl font-semibold text-blue-700 mb-4">Key Highlights</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">
                  <span className="font-semibold">AI-Powered Intelligence:</span> Our chatbot learns and adapts to user behavior, providing increasingly relevant and helpful responses.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">
                  <span className="font-semibold">Seamless Integration:</span> Easily integrates with your existing platforms and workflows.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">
                  <span className="font-semibold">24/7 Availability:</span> Provides instant support and information around the clock.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">
                  <span className="font-semibold">Personalized Experiences:</span> Delivers tailored interactions that feel natural and human-like.
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
