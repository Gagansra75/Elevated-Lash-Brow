import { useState } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaUser, FaRobot } from 'react-icons/fa';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! 👋 Welcome to Elevated Lash & Brow! How can I help you today?",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickReplies = [
    'Book an appointment',
    'View pricing',
    'Lash extensions info',
    'Business hours',
    'Location'
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage.toLowerCase());
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: botResponse,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  const getBotResponse = (message) => {
    if (message.includes('price') || message.includes('cost') || message.includes('pricing')) {
      return "Our pricing ranges from $80 for classic lash extensions to $120 for volume lashes. Threading starts at $15. Would you like to see our full menu?";
    } else if (message.includes('book') || message.includes('appointment')) {
      return "Great! I can help you book an appointment. Please click the 'Book Now' button at the top of the page or scroll to our booking section. What service are you interested in?";
    } else if (message.includes('hours') || message.includes('open')) {
      return "We're open Monday-Friday: 9AM-7PM, Saturday: 10AM-6PM. We're closed on Sundays. Would you like to schedule a visit?";
    } else if (message.includes('location') || message.includes('where')) {
      return "We're located at 123 Beauty Street, Seattle, WA 98101. You can find us on the map in our contact section!";
    } else if (message.includes('lash') || message.includes('extension')) {
      return "We offer Classic, Volume, and Hybrid lash extensions! Each is customized to your eye shape and desired look. Would you like to know more about a specific type?";
    } else {
      return "Thank you for your question! For detailed information, feel free to browse our website or call us at (555) 123-4567. How else can I assist you?";
    }
  };

  const handleQuickReply = (reply) => {
    const userMessage = {
      id: messages.length + 1,
      text: reply,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botResponse = getBotResponse(reply.toLowerCase());
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: botResponse,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        className={`chat-widget-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with us"
      >
        {isOpen ? <FaTimes /> : <FaComments />}
        {!isOpen && <span className="chat-badge">1</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-widget-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <FaRobot className="chat-avatar-icon" />
              <div>
                <h4>Elevated Lash & Brow</h4>
                <span className="chat-status">
                  <span className="status-dot"></span> Online
                </span>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`chat-message ${message.sender}`}>
                <div className="message-avatar">
                  {message.sender === 'bot' ? <FaRobot /> : <FaUser />}
                </div>
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">{message.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-quick-replies">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                className="quick-reply-btn"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </button>
            ))}
          </div>

          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="chat-input"
            />
            <button type="submit" className="chat-send-btn" disabled={!inputMessage.trim()}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
