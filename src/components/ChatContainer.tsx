import { Message } from "../interfaces/Chat"
import { Dispatch, SetStateAction, useState } from "react"
import { ChatNode } from "./ChatNode"

export const ChatContainer = ({
    messages,
    setMessages
}: {
    messages: Message[]
    setMessages: Dispatch<SetStateAction<Message[]>>
}) => {
    console.log(messages)
    return (
        <div className="flex p-8 items-center flex-col overflow-scroll mb-16">
            {
                messages.map((message, index) => {
                    if (message.type === 'assistant') {
                        return (
                            <ChatNode message={message} sender={message.type} key={index}/>
                        )
                    } else if (message.type === 'user') {
                        return (
                            <ChatNode message={message} sender={message.type} key={index}/>
                        )
                    }
                })
            }
        </div>
    )
}