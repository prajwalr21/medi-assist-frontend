import { useEffect, useState } from "react";
import { ChatContainer } from "../components/ChatContainer";
import { UserInput } from "../components/UserInput";
import { Message } from "../interfaces/Chat";
import { useRouter } from "next/router";
import { setSocket } from "../utils/socket";

export default function Human() {
  const router = useRouter()
  console.log(router.query)
  const { pid } = router.query

  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    if (pid) {
      console.log('PID -', pid)
      const socket = setSocket(pid as string, setMessages)
    }
  }, [pid])

  return (
    <div className='min-h-screen w-screen flex flex-col bg-white'>
      <nav className='h-14 p-4 bg-gray-100 flex flex-row w-full text-sm items-center'>
        Medical Assistant
      </nav>
      <ChatContainer messages={messages} setMessages={setMessages}/>
      <UserInput messages={messages} setMessages={setMessages} placeholder="You are now connected with the patient, send them something" />
    </div>
  )
}