import { useEffect, useState } from "react";
import { ChatContainer } from "../components/ChatContainer";
import { UserInput } from "../components/UserInput";
import { introMessage } from "../consts";
import { Message } from "../interfaces/Chat";
import { io } from "socket.io-client";

const defaultMessage = (): Message[] => {
    return [{
        type: 'assistant',
        content: introMessage
    }]
  }

export default function Human() {

  useEffect(() => {
    const socket = io("ws://locahost:5000", {})
  })

  const [messages, setMessages] = useState<Message[]>(() => defaultMessage())
  return (
    <div className='min-h-screen w-screen flex flex-col bg-white'>
      <nav className='h-14 p-4 bg-gray-100 flex flex-row w-full text-sm items-center'>
        Medical Assistant
      </nav>
      <ChatContainer messages={messages} setMessages={setMessages}/>
      <UserInput messages={messages} setMessages={setMessages}  />
    </div>
  )
}