import React, { useState, useRef, useEffect } from "react";
import { Send, Image, Paperclip, Mic, X, MessageCircle, Minimize2 } from 'lucide-react';

const CLOUD_NAME = "dwrniaciw";
const UPLOAD_PRESET = "kijdhsjsk12@kds";

const ChatWidget = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return {
        url: data.secure_url,
        resourceType: data.resource_type
      };
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // Create local preview
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setMediaPreview({
            type: "image",
            localUrl: e.target.result,
            file: file
          });
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith("video/")) {
        setMediaPreview({
          type: "video",
          name: file.name,
          file: file
        });
      } else if (file.type.startsWith("audio/")) {
        setMediaPreview({
          type: "audio",
          name: file.name,
          file: file
        });
      }
    } catch (error) {
      console.error("Error handling file:", error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setMediaPreview({
          type: "audio",
          localUrl: URL.createObjectURL(audioBlob),
          file: new File([audioBlob], "recording.wav", { type: "audio/wav" })
        });
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const clearMediaPreview = () => {
    setMediaPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!inputMessage.trim() && !mediaPreview) return;

  setIsLoading(true);
  let cloudinaryUrl = null;

  try {
    // Upload media to Cloudinary if present
    if (mediaPreview) {
      const uploadResult = await uploadToCloudinary(mediaPreview.file);
      cloudinaryUrl = uploadResult.url;  // Store the Cloudinary URL
    }

    // Add user message to chat with local preview
    const newUserMessage = {
      role: "user",
      content: inputMessage.trim(),
      media: mediaPreview ? {
        type: mediaPreview.type,
        url: mediaPreview.localUrl || null,
        cloudinaryUrl: cloudinaryUrl // Attach Cloudinary URL here
      } : null,
    };

    setMessages(prev => [...prev, newUserMessage]);

    // Send to bot with Cloudinary URL (for image/video/audio sharing)
    const response = await fetch("http://172.16.9.161:8056/chat/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_message: cloudinaryUrl || inputMessage.trim(), // Send Cloudinary URL if available or text message
        conversation_id: conversationId
      }),
    });

    const data = await response.json();
    
    if (!conversationId && data.conversation_id) {
      setConversationId(data.conversation_id);
    }
    
    const assistantMessage = {
      role: "assistant",
      content: data.assistant_response, // Adjust to response from the assistant
    };

    // {
    //   data.pnr,
    //   data.category,
    //   data.subcategory,
    //   data.severity,
    //   cloudinaryUrl

    // }

    setMessages(prev => [...prev, assistantMessage]);
    setInputMessage("");
    setMediaPreview(null);

  } catch (error) {
    console.error("Error:", error);
    setMessages(prev => [...prev, {
      role: "assistant",
      content: "Sorry, I encountered an error. Please try again."
    }]);
  } finally {
    setIsLoading(false);
  }
};

  const renderMessageContent = (message) => {
    return (
      <div className="space-y-2">
        <div>{message.content}</div>
        
        {message.media && (
          <div className="mt-2">
            {message.media.type === "image" && (
              <img
                src={message.media.cloudinaryUrl || message.media.url}
                alt="Shared image"
                className="max-w-full rounded-lg max-h-48 object-contain"
              />
            )}
            {message.media.type === "video" && (
              <video controls className="max-w-full rounded-lg max-h-48">
                <source src={message.media.cloudinaryUrl || message.media.url} type="video/mp4" />
                Your browser does not support the video element.
              </video>
            )}
            {message.media.type === "audio" && (
              <audio controls className="w-full">
                <source src={message.media.cloudinaryUrl || message.media.url} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        )}

        {message.complaintDetails && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg text-sm">
            <div className="font-semibold">Complaint Registered!</div>
            <div>Complaint ID: {message.complaintDetails.complaintId}</div>
            {message.complaintDetails.pnr && (
              <div>PNR: {message.complaintDetails.pnr}</div>
            )}
            {message.complaintDetails.details && (
              <div className="mt-2">
                <div className="font-medium">Details:</div>
                <ul className="list-disc ml-4">
                  {Object.entries(message.complaintDetails.details).map(([key, value]) => (
                    <li key={key}>{key}: {value}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isExpanded ? (
        <button
          onClick={() => {
            setIsExpanded(true);
            setUnreadCount(0);
          }}
          className="bg-[#5E0022] text-white p-4 rounded-full shadow-lg hover:bg-[#600000] transition-all duration-300 relative"
        >
          <MessageCircle className="w-6 h-6" />
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </div>
          )}
        </button>
      ) : (
        <div className="w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col">
          <div className="p-4 bg-[#5E0022] text-white rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">Railmadad Assistant</h3>
            <button 
              onClick={() => setIsExpanded(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-[#5E0022] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {renderMessageContent(message)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-4">
                <div className="inline-block p-3 rounded-lg bg-gray-100">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {mediaPreview && (
            <div className="px-4 py-2 border-t">
              <div className="relative inline-block">
                {mediaPreview.type === 'image' && (
                  <img 
                    src={mediaPreview.localUrl} 
                    alt="Preview" 
                    className="h-20 w-auto rounded"
                  />
                )}
                {mediaPreview.type === 'video' && (
                  <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded">
                    <Paperclip className="w-4 h-4" />
                    <span className="text-sm">{mediaPreview.name}</span>
                  </div>
                )}
                {mediaPreview.type === 'audio' && (
                  <audio controls className="h-10">
                    <source src={mediaPreview.localUrl} type="audio/wav" />
                  </audio>
                )}
                <button
                  onClick={clearMediaPreview}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your complaint or message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-[#5E0022]"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="image/*,video/*,audio/*"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-[#5E0022] rounded-lg hover:bg-red-50"
              >
                <Image className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className={`p-2 rounded-lg ${
                  isRecording 
                    ? 'text-red-600 hover:bg-red-50' 
                    : 'text-[#5E0022] hover:bg-red-50'
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>
              <button
                type="submit"
                disabled={isLoading || (!inputMessage.trim() && !mediaPreview)}
                className="p-2 bg-[#5E0022] text-white rounded-lg hover:bg-[#600000] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;