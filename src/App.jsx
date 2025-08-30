import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarRef = useRef(null);
  const mainContainerRef = useRef(null);
  const hamburgerRef = useRef(null);
  const chatAreaRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isMobile = window.innerWidth <= 768;
      if (
        isMobile &&
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !mainContainerRef.current.contains(e.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newUserMessage = { role: 'user', content: userInput };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setUserInput('');
    setLoading(true);

    try {
      // Use Vite environment variables
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      
      if (!apiKey) {
        throw new Error('API key not found. Please set VITE_OPENROUTER_API_KEY in your .env file.');
      }

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': import.meta.env.VITE_SITE_URL || 'http://localhost:3000',
          'X-Title': import.meta.env.VITE_SITE_NAME || 'My ChatBot',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat-v3.1:free',
          messages: updatedMessages,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenRouter API Error:", errorData);
        throw new Error(`OpenRouter API error: ${response.status} - ${errorData.message || 'Failed to get response'}`);
      }

      const data = await response.json();
      if (data && data.choices && data.choices[0]) {
        const botResponse = data.choices[0].message.content;
        setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: botResponse }]);
      } else if (data && data.error) {
        console.error("OpenRouter API Error:", data.error);
        setMessages(prevMessages => [...prevMessages, {
          role: 'assistant',
          content: `Error: ${data.error.message || 'Failed to get response from the chatbot.'}`
        }]);
      }
      else {
        setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Sorry, no response from the chatbot.' }]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: `Sorry, I encountered an error: ${error.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setSidebarOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Top Header for Desktop */}
      <div className="desktop-header">
        <h1>My Chatbot</h1>
      </div>

      <div className="main-container" ref={mainContainerRef}>
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} ref={sidebarRef}>
          <div className="sidebar-header">
            <h2>Chats</h2>
            <button className="new-chat-btn" onClick={handleNewChat}>+ New Chat</button>
          </div>
        </div>

        {/* Mobile Top Navbar */}
        <div className="mobile-nav">
          <button ref={hamburgerRef} onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <h1 className="mobile-title">My Chatbot</h1>
          <button onClick={handleNewChat}>✨</button>
        </div>

        {/* Chat area */}
        <div className="chat-area" ref={chatAreaRef}>
          <div className="chat-box">
            {messages.length === 0 && (
              <div className="welcome-message">
                <h2 style={{
                  fontWeight: 'bold',
                  color: '#4CAF50',
                  marginBottom: '1rem',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                  textAlign: 'center'
                }}>
                  👋 Welcome to ChatBot!
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#555',
                  lineHeight: '1.7',
                  padding: '0 2rem',
                  textAlign: 'center'
                }}>
                  I'm here to help. Ask me anything to get started.
                </p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div key={index} className={msg.role}>
                <p>{msg.content}</p>
              </div>
            ))}
            {loading && (
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-container">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
            />
            <button onClick={handleSendMessage} disabled={loading}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;