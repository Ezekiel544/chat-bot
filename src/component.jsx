import { Routes, Route } from 'react-router-dom';
import Navbar from "./navbar";
import Hero from "./hero";
import Features from "./features";
import About from "./about";
import Footer from "./footer";
import ChatBot from './App'; // ✅ Import your Chatbot page
import './index.css';

function App() {
  return (
    <div className="bg-[#edf2f7] text-[#1a202c] min-h-screen flex flex-col">
     

      <Routes>
        {/* Landing Page */}
        <Route path="/" element={
          <>
           <Navbar />
            <Hero />
            <Features />
            <About />
            <Footer />
          </>
        } />

        {/* ChatBot Page */}
        <Route path="/chatbot" element={<ChatBot />} />
      </Routes>
    </div>
  );
}

export default App;
