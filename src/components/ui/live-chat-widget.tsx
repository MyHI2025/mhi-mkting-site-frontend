// import { useState, useRef, useEffect } from "react";
// import { MessageCircle, X, Send, Minimize2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useLiveChat } from "@/components/ui/live-chat-provider";

// interface Message {
//   id: string;
//   text: string;
//   sender: 'user' | 'support';
//   timestamp: Date;
// }

// interface LiveChatWidgetProps {
//   onClose?: () => void;
// }

// export default function LiveChatWidget({ onClose }: LiveChatWidgetProps) {
//   const { isOpen, openChat, closeChat } = useLiveChat();
//   const [isMinimized, setIsMinimized] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '1',
//       text: 'Hello! Welcome to My Health Integral. How can I help you today?',
//       sender: 'support',
//       timestamp: new Date()
//     }
//   ]);
//   const [inputMessage, setInputMessage] = useState('');
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (inputMessage.trim()) {
//       const newMessage: Message = {
//         id: Date.now().toString(),
//         text: inputMessage,
//         sender: 'user',
//         timestamp: new Date()
//       };
      
//       setMessages(prev => [...prev, newMessage]);
//       setInputMessage('');
      
//       // Simulate support response after a delay
//       setTimeout(() => {
//         const supportMessage: Message = {
//           id: (Date.now() + 1).toString(),
//           text: 'Thank you for your message. Our support team will get back to you shortly. For immediate assistance, please call our support line or check our FAQ section.',
//           sender: 'support',
//           timestamp: new Date()
//         };
//         setMessages(prev => [...prev, supportMessage]);
//       }, 1500);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   if (!isOpen) {
//     return (
//       <div className="fixed bottom-6 right-6 z-50">
//         <Button
//           onClick={openChat}
//           className="bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200"
//           data-testid="chat-widget-open"
//         >
//           <MessageCircle className="h-6 w-6" />
//           <span className="sr-only">Open live chat</span>
//         </Button>
        
//         {/* Notification badge */}
//         <div className="absolute -top-2 -right-2 bg-destructive text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce">
//           1
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       <Card className={`w-80 h-96 shadow-2xl transition-all duration-200 ${isMinimized ? 'h-14' : 'h-96'}`} data-testid="chat-widget">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary text-white rounded-t-lg">
//           <CardTitle className="text-sm font-medium">
//             Live Chat Support
//           </CardTitle>
//           <div className="flex items-center space-x-2">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setIsMinimized(!isMinimized)}
//               className="h-6 w-6 p-0 text-white hover:bg-white/10"
//               data-testid="chat-minimize"
//             >
//               <Minimize2 className="h-3 w-3" />
//             </Button>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => {
//                 closeChat();
//                 onClose?.();
//               }}
//               className="h-6 w-6 p-0 text-white hover:bg-white/10"
//               data-testid="chat-close"
//             >
//               <X className="h-3 w-3" />
//             </Button>
//           </div>
//         </CardHeader>
        
//         {!isMinimized && (
//           <>
//             <CardContent className="p-0 flex-1">
//               <ScrollArea className="h-64 p-4" data-testid="chat-messages">
//                 <div className="space-y-4">
//                   {messages.map((message) => (
//                     <div
//                       key={message.id}
//                       className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//                     >
//                       <div
//                         className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
//                           message.sender === 'user'
//                             ? 'bg-primary text-white'
//                             : 'bg-secondary text-secondary-foreground'
//                         }`}
//                         data-testid={`chat-message-${message.sender}`}
//                       >
//                         <p>{message.text}</p>
//                         <p className="text-xs opacity-70 mt-1">
//                           {message.timestamp.toLocaleTimeString()}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                   <div ref={messagesEndRef} />
//                 </div>
//               </ScrollArea>
//             </CardContent>
            
//             <div className="p-4 border-t">
//               <div className="flex space-x-2">
//                 <Input
//                   placeholder="Type your message..."
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   className="flex-1"
//                   data-testid="chat-input"
//                 />
//                 <Button
//                   onClick={handleSendMessage}
//                   disabled={!inputMessage.trim()}
//                   size="sm"
//                   data-testid="chat-send"
//                 >
//                   <Send className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </>
//         )}
//       </Card>
//     </div>
//   );
// }


import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLiveChat } from "@/components/ui/live-chat-provider";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

interface LiveChatWidgetProps {
  onClose?: () => void;
}

export default function LiveChatWidget({ onClose }: LiveChatWidgetProps) {
  const { isOpen, openChat, closeChat } = useLiveChat();
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to My Health Integral. How can I help you today?',
      sender: 'support',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');

      try {
        // 🔥 Send user message to chatbot API
        const response = await fetch('https://p01--mhi-chatbot--r26x8qbp28xt.code.run/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            query: inputMessage,
            session_id: '001'
          })
        });

        const data = await response.json();

        const botReply = data.response || 'No response from assistant.';

        const supportMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botReply,
          sender: 'support',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, supportMessage]);
      } catch (error) {
        console.error('Chatbot API error:', error);

        const errorMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: '⚠️ Error connecting to assistant. Please try again later.',
          sender: 'support',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, errorMessage]);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={openChat}
          className="bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200"
          data-testid="chat-widget-open"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open live chat</span>
        </Button>

        {/* Notification badge */}
        <div className="absolute -top-2 -right-2 bg-destructive text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce">
          1
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={`w-80 h-96 shadow-2xl transition-all duration-200 ${isMinimized ? "h-14" : "h-96"}`}
        data-testid="chat-widget"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary text-white rounded-t-lg">
          <CardTitle className="text-sm font-medium">Live Chat Support</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-6 w-6 p-0 text-white hover:bg-white/10"
              data-testid="chat-minimize"
            >
              <Minimize2 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                closeChat();
                onClose?.();
              }}
              className="h-6 w-6 p-0 text-white hover:bg-white/10"
              data-testid="chat-close"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="p-0 flex-1">
              <ScrollArea className="h-64 p-4" data-testid="chat-messages">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                          message.sender === "user"
                            ? "bg-primary text-white"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                        data-testid={`chat-message-${message.sender}`}
                      >
                        <p>{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  data-testid="chat-input"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  size="sm"
                  data-testid="chat-send"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
