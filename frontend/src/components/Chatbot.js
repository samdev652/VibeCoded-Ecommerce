import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, HelpCircle } from 'lucide-react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! 👋 I\'m here to help you with any questions about our store. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // FAQ Database
  const faqDatabase = [
    {
      keywords: ['shipping', 'delivery', 'ship', 'deliver', 'how long'],
      response: 'We offer free shipping on orders over $50. Standard delivery takes 3-5 business days, while express shipping takes 1-2 business days. You can track your order from the Orders page after logging in.'
    },
    {
      keywords: ['return', 'refund', 'exchange', 'money back'],
      response: 'We have a 30-day return policy. Items must be unused and in original packaging. To initiate a return, go to your Orders page and select the item you wish to return. Refunds are processed within 5-7 business days after we receive the item.'
    },
    {
      keywords: ['payment', 'pay', 'card', 'credit', 'debit', 'payment methods'],
      response: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and PayPal. All payments are securely processed and encrypted.'
    },
    {
      keywords: ['track', 'order status', 'where is my order', 'tracking'],
      response: 'You can track your order by logging into your account and visiting the Orders page. Once your order ships, you\'ll receive a tracking number via email.'
    },
    {
      keywords: ['account', 'register', 'sign up', 'create account'],
      response: 'Creating an account is easy! Click on the "Register" button in the top right corner. You\'ll need to provide your email, create a password, and add your name. With an account, you can track orders, save favorites, and checkout faster.'
    },
    {
      keywords: ['size', 'sizing', 'fit', 'measurements'],
      response: 'Each product page includes a detailed size guide. Click on the "Size Guide" link on the product page to find measurements. If you\'re between sizes, we generally recommend sizing up for a more comfortable fit.'
    },
    {
      keywords: ['discount', 'coupon', 'promo', 'sale', 'offer'],
      response: 'Check our homepage for current promotions and sales! You can apply discount codes at checkout. Sign up for our newsletter to receive exclusive offers and early access to sales.'
    },
    {
      keywords: ['contact', 'support', 'help', 'customer service', 'email'],
      response: 'You can reach our customer support team at support@vibecoded.com or call us at 1-800-VIBE-123. Our support hours are Monday-Friday, 9 AM - 6 PM EST.'
    },
    {
      keywords: ['cancel', 'order cancel', 'cancel order'],
      response: 'You can cancel your order within 24 hours of placing it. Go to your Orders page, find the order, and click "Cancel Order". If 24 hours have passed, please contact our support team for assistance.'
    },
    {
      keywords: ['stock', 'availability', 'out of stock', 'restock', 'available'],
      response: 'If an item shows as "Out of Stock", you can click the "Notify Me" button to receive an email when it\'s back in stock. We typically restock popular items within 2-3 weeks.'
    },
    {
      keywords: ['warranty', 'guarantee', 'quality'],
      response: 'All our products come with a manufacturer\'s warranty. The warranty period varies by product - check the product details page for specific information. We also offer a 100% satisfaction guarantee.'
    },
    {
      keywords: ['international', 'worldwide', 'global', 'country'],
      response: 'Yes, we ship internationally to most countries! International shipping costs and delivery times vary by location. You can see the exact shipping cost at checkout when you enter your address.'
    }
  ];

  const quickQuestions = [
    'How long does shipping take?',
    'What is your return policy?',
    'How can I track my order?',
    'What payment methods do you accept?'
  ];

  const findAnswer = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for greetings
    if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/.test(lowerMessage)) {
      return 'Hello! How can I help you today? Feel free to ask me about shipping, returns, payments, or any other questions you might have.';
    }

    // Check for thanks
    if (/^(thank|thanks|appreciate)/.test(lowerMessage)) {
      return 'You\'re welcome! Is there anything else I can help you with?';
    }

    // Search FAQ database
    for (const faq of faqDatabase) {
      if (faq.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return faq.response;
      }
    }

    // Default response if no match found
    return 'I\'m not sure about that specific question. Here are some topics I can help with:\n\n• Shipping & Delivery\n• Returns & Refunds\n• Payment Methods\n• Order Tracking\n• Account Questions\n\nYou can also contact our support team at support@vibecoded.com for more personalized assistance.';
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMessage = {
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking and respond
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: findAnswer(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    // Auto-send the quick question
    setTimeout(() => {
      const userMessage = {
        type: 'user',
        text: question,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);

      setTimeout(() => {
        const botResponse = {
          type: 'bot',
          text: findAnswer(question),
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1000);
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="chatbot-container">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button 
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
          <span className="chatbot-badge">Ask us!</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <MessageCircle size={20} />
              <div>
                <h3>VibeCoded Support</h3>
                <span className="chatbot-status">Online</span>
              </div>
            </div>
            <button 
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="chatbot-quick-questions">
              <div className="quick-questions-header">
                <HelpCircle size={16} />
                <span>Quick Questions</span>
              </div>
              <div className="quick-questions-grid">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="quick-question-btn"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.type}`}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-container">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Type your question..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="chatbot-send"
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === ''}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
