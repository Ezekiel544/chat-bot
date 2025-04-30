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

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'HTTP-Referer': '<YOUR_SITE_URL>',
          'X-Title': '<YOUR_SITE_NAME>',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat:free',
          messages: [...newMessages, { role: 'user', content: userInput }],
        }),
      });

      const data = await response.json();
      if (data && data.choices && data.choices[0]) {
        const botResponse = data.choices[0].message.content;
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: botResponse },
        ]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setSidebarOpen(false);
  };

  return (
    <>{/* Top Header for Desktop */}
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
      <div className="chat-area">
        <div className="chat-box">
          {messages.length === 0 && (
          <div className="welcome-message">
          <h3>👋 Welcome to <span className="highlight">ChatBot</span>!</h3>
          <p>I'm here to help. Ask me anything to get started.</p>
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
        </div>

        <div className="input-container">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
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
