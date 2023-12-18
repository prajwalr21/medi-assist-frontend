import { Message } from "../interfaces/Chat"
import { Dispatch, MouseEvent, SetStateAction, useRef, KeyboardEvent } from "react"
import { IoSend } from "react-icons/io5";
import { processUserMessage } from "../utils/processUserMessage";

export const UserInput = ({
    placeholder,
    messages,
    setMessages
}: {
    placeholder: string,
    messages: Message[]
    setMessages: Dispatch<SetStateAction<Message[]>>
}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const sumbitHandler = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const userMessage = inputRef.current?.value
        if (inputRef.current) {
            inputRef.current.value = ""
        }
        processUserMessage(userMessage ?? '', messages, setMessages)
    }

    const keyCheckHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            const userMessage = inputRef.current?.value
            if (inputRef.current) {
                inputRef.current.value = ""
            }
            processUserMessage(userMessage ?? '', messages, setMessages)
        }
    }

    return (
        <div onKeyDown={keyCheckHandler} className="flex h-24 text-sm rounded-t-xl rounded-r-xl drop-shadow-xl shadow-xl flex-row p-4 gap-4 justify-center items-center bg-gray-100 fixed bottom-0 w-[50%] md:w-full` left-[50%] translate-x-[-50%]">
            <input className="w-[80%] px-4 py-2 h-12 rounded-xl placeholder:text-sm" ref={inputRef} type="text" placeholder={placeholder} />
            <button className="px-4 py-3 bg-gray-400 rounded-xl" onClick={sumbitHandler}><IoSend style={{color:'white'}}/></button>
        </div>
    )
}