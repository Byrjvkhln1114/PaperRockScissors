import { useEffect, useState } from "react";
import * as Ably from "ably";
import React from "react";
// import "./chat.css";
const client = new Ably.Realtime(
  "F7535w.UF0GVA:AF34Dbhvs7uDnyt1p3tT5c7qvkkXWkD1kNI9ZKMiXvE"
);

type ChatItemProps = {
  sender: string;
  message: string;
};
const ChatItem: React.FC<ChatItemProps> = (props) => {
  const { sender, message } = props;
  return (
    <div className="chat-item my-4">
      <span className="text-green-500 mr-4">{sender}:</span>
      <span className="">{message}</span>
    </div>
  );
};

export default function ChatScreen() {
  const [me, setMe] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatItemProps[]>([]);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  const handleSendMessage = (userInput: string) => {
    if (userInput === "") return;
    client.channels
      .get("chat")
      .publish("message", { sender: me, message: userInput });
  };

  useEffect(() => {
    if (me === "") {
      const nickname = prompt("Нэрээ оруулна уу");
      setMe(nickname + "");
    }
    client.channels.get("chat").subscribe("message", (message) => {
      setMessages((messages) => [...messages, message.data]);
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-black h-screen w-full p-5 pb-28 text-white">
      <div className="h-full overflow-auto w-full">
        {messages.map((message, index) => (
          <ChatItem
            sender={message.sender}
            message={message.message}
            key={`chat-item-${index}`}
          />
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-3">
        <input
          className="rounded w-[80%] bg-slate-900"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          className="border border-green-500 rounded p-3 text-green-500"
          onClick={() => (handleSendMessage(message), setMessage(""))}
        >
          Send
        </button>
      </div>
    </div>
  );
}
