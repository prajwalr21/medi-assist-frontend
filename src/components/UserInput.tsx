import { redirect } from "next/navigation";
import { Message } from "../interfaces/Chat"
import { getAnswer } from "../utils/getAnswer"
import { Dispatch, MouseEvent, SetStateAction, useRef, KeyboardEvent } from "react"
import { IoSend } from "react-icons/io5";

export const UserInput = ({
    messages,
    setMessages
}: {
    messages: Message[]
    setMessages: Dispatch<SetStateAction<Message[]>>
}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const sumbitHandler = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const userMessage = inputRef.current?.value
        const updatedMessage: Message[] = [
            ...messages,
            {
                type: 'user',
                content: userMessage
            } as Message
        ]
        setMessages(updatedMessage)
        if (inputRef.current) {
            inputRef.current.value = ""
        }
        const aiResponse = await getAnswer(updatedMessage)
        setMessages((prev) => {
            return [
                ...prev,
                {
                    type: aiResponse.type,
                    content: aiResponse.content
                } as Message
            ]
        })
    }

    const keyCheckHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            const userMessage = inputRef.current?.value
            const updatedMessage: Message[] = [
                ...messages,
                {
                    type: 'user',
                    content: userMessage
                } as Message
            ]
            setMessages(updatedMessage)
            if (inputRef.current) {
                inputRef.current.value = ""
            }
            const aiResponse = await getAnswer(updatedMessage)
            if (aiResponse.content === '*SERIOUS*') {
                // Need to move the client to a websocket connection
                setMessages(prev => {
                    return [
                        ...prev,
                        {
                            type: 'assistant',
                            content: `Please visit this link ${window.location.origin}/human, your issue needs human intervention`
                        }
                    ]
                })
            } else {
                setMessages((prev) => {
                    return [
                        ...prev,
                        {
                            type: aiResponse.type,
                            content: aiResponse.content
                        } as Message
                    ]
                })
            }
        }
    }

    return (
        <div onKeyDown={keyCheckHandler} className="flex h-24 text-sm rounded-t-xl rounded-r-xl drop-shadow-xl shadow-xl flex-row p-4 gap-4 justify-center items-center bg-gray-100 fixed bottom-0 w-[50%] md:w-full` left-[50%] translate-x-[-50%]">
            <input className="w-[80%] px-4 py-2 h-12 rounded-xl placeholder:text-sm" ref={inputRef} type="text" placeholder="Enter something like 'I have pain in my elbow'" />
            <button className="px-4 py-3 bg-gray-400 rounded-xl" onClick={sumbitHandler}><IoSend style={{color:'white'}}/></button>
        </div>
    )
}