import { Message } from "../interfaces/Chat"
import { BotIcon } from "./icons/BotIcon"
import { UserIcon } from "./icons/UserIcons"

export const ChatNode = ({message, sender}: {message: Message, sender: string}) => {
    console.log(sender)
    return (
        <div className="p-4 w-[70%] flex flex-row gap-4 text-sm">
            {sender === 'assistant' ? <BotIcon /> : <UserIcon />}
            <p className="w-full border-b-[2px] pb-4 border-b-gray-300">{message.content}</p>
        </div>
    )
}