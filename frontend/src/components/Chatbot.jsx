import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css';

const API_URL = 'http://localhost:8000/api';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [leadSubmitted, setLeadSubmitted] = useState(false);
    const [leadData, setLeadData] = useState({ name: '', mobile: '' });
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        if (!leadData.name || !leadData.mobile) return;

        setIsSubmitting(true);
        try {
            await axios.post(`${API_URL}/chatbot-leads/`, leadData);
            setLeadSubmitted(true);
            setMessages([
                { id: 1, text: `Hi ${leadData.name.split(' ')[0]}! Welcome to MUKTOSOFT. How can I help you today?`, sender: 'bot' }
            ]);
        } catch (err) {
            console.error('Error submitting lead:', err);
            // Fallback: still let them chat even if API fails
            setLeadSubmitted(true);
            setMessages([
                { id: 1, text: `Hi ${leadData.name.split(' ')[0]}! Welcome to MUKTOSOFT. How can I help you today?`, sender: 'bot' }
            ]);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simple bot logic
        setTimeout(() => {
            let botResponse = `Thanks for your message, ${leadData.name.split(' ')[0]}! Our team will get back to you soon. You can also reach us via WhatsApp for a faster response.`;

            const lowerInput = input.toLowerCase();
            if (lowerInput.includes('service') || lowerInput.includes('offer')) {
                botResponse = "We offer Web Development, Mobile Apps, Cloud Solutions, and Cyber Security services. Which one are you interested in?";
            } else if (lowerInput.includes('price') || lowerInput.includes('cost')) {
                botResponse = "Our pricing depends on the project scope. Feel free to use the contact form or WhatsApp us for a custom quote!";
            } else if (lowerInput.includes('hi') || lowerInput.includes('hello')) {
                botResponse = `Hello ${leadData.name.split(' ')[0]}! How can we assist you with your digital needs today?`;
            }

            const botMsg = { id: Date.now() + 1, text: botResponse, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        }, 800);
    };

    return (
        <div className={`chatbot-wrapper ${isOpen ? 'open' : ''}`}>
            {!isOpen && (
                <button className="chat-launcher" onClick={() => setIsOpen(true)}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    <span className="launcher-text">Chat with us</span>
                </button>
            )}

            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="header-info">
                            <div className="bot-avatar">MS</div>
                            <div>
                                <h3>Mukto Soft Assistant</h3>
                                <span className="status-dot">Online</span>
                            </div>
                        </div>
                        <button className="close-chat" onClick={() => setIsOpen(false)}>×</button>
                    </div>

                    {!leadSubmitted ? (
                        <form className="chat-lead-form" onSubmit={handleLeadSubmit}>
                            <div className="form-header">
                                <h4>Get Started</h4>
                                <p>Please enter your details to start the conversation.</p>
                            </div>

                            <div className="lead-input-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={leadData.name}
                                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="lead-input-group">
                                <label>Mobile Number</label>
                                <input
                                    type="tel"
                                    placeholder="Enter your mobile number"
                                    value={leadData.mobile}
                                    onChange={(e) => setLeadData({ ...leadData, mobile: e.target.value })}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-start-chat">
                                Start Chat
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </form>
                    ) : (
                        <>
                            <div className="chat-messages">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`message ${msg.sender}`}>
                                        <div className="message-content">{msg.text}</div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            <form className="chat-input" onSubmit={handleSend}>
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <button type="submit">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                </button>
                            </form>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Chatbot;
