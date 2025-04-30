import React from 'react';
import { motion } from 'framer-motion';
import {
    Clock,
    MessageCircle,
    Link,
    Palette,
    BarChart,
    Globe,
} from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <Clock className="h-8 w-8 text-blue-500" />,
            title: '24/7 Support',
            desc: 'Always available to assist your users with instant responses.',
        },
        {
            icon: <MessageCircle className="h-8 w-8 text-blue-500" />,
            title: 'Smart Conversations',
            desc: 'Understand context and reply intelligently using AI technology.',
        },
        {
            icon: <Link className="h-8 w-8 text-blue-500" />,
            title: 'Easy Integration',
            desc: 'Seamlessly integrate ChatBotX with your website or app in minutes.',
        },
        {
            icon: <Palette className="h-8 w-8 text-blue-500" />,
            title: 'Customizable Design',
            desc: "Easily match the chatbot's look and feel to your brand identity.",
        },
        {
            icon: <BarChart className="h-8 w-8 text-blue-500" />,
            title: 'Analytics Dashboard',
            desc: 'Monitor conversations, traffic, and user engagement with ease.',
        },
        {
            icon: <Globe className="h-8 w-8 text-blue-500" />,
            title: 'Multi-language Support',
            desc: 'Serve users globally with real-time multilingual translations.',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Stagger the appearance of the children
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 50 }, // Start off-screen to the right
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }, // Exit off-screen to the left
    };

    return (
        <section id="features" className="px-6 md:px-20 py-5" style={{ overflow: 'hidden' }}> {/* Added overflow: 'hidden' here */}
            {/* Heading */}
            <motion.h2
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-4xl font-bold text-center mb-10"
            >
                Powerful Features
            </motion.h2>

            {/* Features grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }} //  Change to false to repeat animation
                className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="bg-[#f1f5f9] p-8 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center"
                    >
                        {/* Icon */}
                        <div className="mb-4">{feature.icon}</div>
                        {/* Title */}
                        <h3 className="text-2xl font-semibold mb-3 text-[#0052cc]">{feature.title}</h3>
                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{feature.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Features;
