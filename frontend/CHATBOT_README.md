# Chatbot Feature - VibeCoded E-commerce

## Overview
An intelligent FAQ chatbot integrated into the VibeCoded e-commerce platform to assist customers with common questions about shipping, returns, payments, and more.

## Features

### 🤖 Smart FAQ System
- **Keyword-based Response Engine**: Intelligently matches user questions with relevant answers
- **Comprehensive FAQ Database**: Covers 12+ common topics including:
  - Shipping & Delivery (timing, tracking, costs)
  - Returns & Refunds (policy, process, timeline)
  - Payment Methods (accepted cards, security)
  - Order Tracking & Status
  - Account Management
  - Product Sizing & Fit
  - Discounts & Promotions
  - Customer Support Contact
  - Order Cancellation
  - Stock & Availability
  - Warranty & Quality
  - International Shipping

### 💬 User Experience
- **Greeting Detection**: Responds to common greetings naturally
- **Quick Questions**: Pre-defined question buttons for instant answers
- **Typing Indicator**: Shows when the bot is "thinking"
- **Timestamp Display**: Shows message time for context
- **Smooth Animations**: Slide-up window, fade-in messages, pulse status
- **Responsive Design**: Works on desktop and mobile devices

### 🎨 Design Features
- **Floating Toggle Button**: Non-intrusive chat bubble in bottom-right corner
- **Modern UI**: Clean, professional interface with gradient header
- **Online Status Indicator**: Animated pulse showing bot availability
- **Scrollable Chat History**: Maintains conversation context
- **Accessible**: Proper ARIA labels and keyboard support

## Technical Implementation

### Components
- **Chatbot.js**: Main React component with state management and logic
- **Chatbot.css**: Comprehensive styling with animations and responsive design

### Key Functions
```javascript
findAnswer(userMessage)     // Matches user input to FAQ responses
handleSendMessage()         // Processes user messages
handleQuickQuestion()       // Handles pre-defined question clicks
```

### State Management
- `isOpen`: Controls chatbot visibility
- `messages`: Stores conversation history
- `inputMessage`: Tracks current user input
- `isTyping`: Shows typing indicator state

## Usage

### For Users
1. Click the "Ask us!" button in the bottom-right corner
2. Choose a quick question or type your own
3. Receive instant answers to common questions
4. Continue the conversation as needed

### For Developers
The chatbot is automatically integrated into the app:
```javascript
import Chatbot from './components/Chatbot';

// Add to your App component
<Chatbot />
```

## Customization

### Adding New FAQs
Edit the `faqDatabase` array in `Chatbot.js`:
```javascript
{
  keywords: ['your', 'keywords', 'here'],
  response: 'Your helpful response here'
}
```

### Styling
Modify colors and design in `Chatbot.css`:
- Primary color: `var(--primary-color)`
- Window size: `.chatbot-window { width: 380px; }`
- Animation speed: Adjust transition durations

### Quick Questions
Update the `quickQuestions` array to change default suggestions:
```javascript
const quickQuestions = [
  'Your custom question 1',
  'Your custom question 2',
  // ...
];
```

## Mobile Responsive
- Adapts to screen size automatically
- Full-screen on small devices
- Touch-friendly buttons and inputs
- Optimized scrolling

## Future Enhancements
Potential improvements for future versions:
- AI-powered natural language processing
- Backend integration for dynamic responses
- Multi-language support
- Chat history persistence
- File/image sharing capabilities
- Live agent handoff
- Analytics and insights
- Product recommendations within chat

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies
Uses existing project dependencies:
- React
- lucide-react (for icons: MessageCircle, X, Send, HelpCircle)

## Performance
- Lightweight: ~15KB total (JS + CSS)
- Fast response time: 1 second simulated "thinking"
- Optimized animations with CSS transforms
- Efficient re-renders with React hooks

## Accessibility
- Keyboard navigation support (Enter to send)
- ARIA labels for screen readers
- High contrast colors for readability
- Focus states for interactive elements

---

**Version**: 1.0.0  
**Last Updated**: November 2025  
**Maintained by**: VibeCoded Team
