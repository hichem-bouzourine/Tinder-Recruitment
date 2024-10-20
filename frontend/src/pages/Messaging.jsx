import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

// Mock data for message threads and messages
const mockThreads = [
    { id: 1, name: "John Doe", lastMessage: "Hello, how are you?", timestamp: "10:30 AM" },
    { id: 2, name: "Jane Smith", lastMessage: "Can we reschedule?", timestamp: "9:15 AM" },
    { id: 3, name: "Company X", lastMessage: "Job offer confirmation", timestamp: "Yesterday" },
    { id: 4, name: "Sarah Lee", lastMessage: "I'll send over the details", timestamp: "2 days ago" },
];

const mockMessages = {
    1: [
        { id: 1, sender: "John Doe", message: "Hello, how are you?", timestamp: "10:30 AM" },
        { id: 2, sender: "You", message: "I’m good, thanks! What about you?", timestamp: "10:32 AM" },
        { id: 3, sender: "John Doe", message: "I'm doing great, thanks for asking!", timestamp: "10:33 AM" },
    ],
    2: [
        { id: 1, sender: "Jane Smith", message: "Can we reschedule?", timestamp: "9:15 AM" },
        { id: 2, sender: "You", message: "Sure, let me check my calendar.", timestamp: "9:16 AM" },
    ],
    3: [
        { id: 1, sender: "Company X", message: "Job offer confirmation", timestamp: "Yesterday" },
        { id: 2, sender: "You", message: "Thank you for the offer!", timestamp: "Yesterday" },
    ],
    4: [
        { id: 1, sender: "Sarah Lee", message: "I'll send over the details", timestamp: "2 days ago" },
    ]
};

const Messaging = () => {
    const [selectedThread, setSelectedThread] = useState(mockThreads[0]);
    const [messages, setMessages] = useState(mockMessages[selectedThread.id]);
    const [newMessage, setNewMessage] = useState('');

    const handleThreadClick = (thread) => {
        setSelectedThread(thread);
        setMessages(mockMessages[thread.id]);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const newMsg = {
            id: messages.length + 1,
            sender: "You",
            message: newMessage,
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages([...messages, newMsg]);
        setNewMessage('');
        setSelectedThread((prev) => ({
            ...prev,
            lastMessage: newMessage,
            timestamp: newMsg.timestamp,
        }));

        mockMessages[selectedThread.id].push(newMsg);
    };

    return (
        <div className="flex flex-row">
            <div>
                <Sidebar />
            </div>
            <div className="flex w-full h-screen bg-gray-100 p-4 space-x-6">
                {/* Left: Message Threads */}
                <div className="w-1/3 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
                    <h2 className="text-2xl font-semibold text-blue-500 p-4 border-b">Messages</h2>
                    <ul className="overflow-auto flex-1">
                        {mockThreads.map((thread) => (
                            <li
                                key={thread.id}
                                onClick={() => handleThreadClick(thread)}
                                className={`p-4 cursor-pointer flex justify-between items-center border-b ${selectedThread.id === thread.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                                    }`}
                            >
                                <div>
                                    <p className="font-semibold text-gray-700">{thread.name}</p>
                                    <p className="text-gray-500 truncate">{thread.lastMessage}</p>
                                </div>
                                <span className="text-gray-400 text-sm">{thread.timestamp}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: Selected Conversation */}
                <div className="w-2/3 bg-white shadow-lg rounded-lg flex flex-col h-full">
                    <div className="border-b p-4">
                        <h2 className="text-xl font-semibold text-blue-500">{selectedThread.name}</h2>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex ${message.sender === "You" ? 'justify-end' : 'justify-start'} mb-4`}>
                                <div
                                    className={`p-3 max-w-xs rounded-lg shadow-lg ${message.sender === "You" ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                                        }`}
                                >
                                    <p>{message.message}</p>
                                    <span className="text-xs text-gray-400">{message.timestamp}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Box */}
                    <div className="p-4 border-t flex items-center space-x-4">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messaging;
