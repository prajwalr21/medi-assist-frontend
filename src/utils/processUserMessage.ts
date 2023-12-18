import { Dispatch, SetStateAction } from "react"
import { Message } from "../interfaces/Chat"
import { getSocket, setSocket } from "./socket"
import { getAnswer } from "./getAnswer"

export const processUserMessage = async (userMessage: string, currMessages: Message[], setMessages: Dispatch<SetStateAction<Message[]>>) => {
    const updatedMessage: Message[] = [
        ...currMessages,
        {
            type: 'user',
            content: userMessage
        } as Message
    ]
    setMessages(updatedMessage)
    const socket = getSocket()
    if (socket) {
        socket.emit('client', userMessage)
        socket.on('server', (message: string) => {
        console.log('receieved message from server', message)
    })
    } else {
        const aiResponse = await getAnswer(updatedMessage)
        if (aiResponse.content === '*SERIOUS*') {
            // Initialize socket connection here
            const socket = setSocket(updatedMessage, setMessages)
            socket.on('connect', () => {
                console.log('connected to socket server, now every message will be sent to the socket server')
            })
            console.log('SOCKET HAS BEEN SET', socket)
            // Need to move the client to a websocket connection
            setMessages(prev => {
                return [
                    ...prev,
                    {
                        type: 'assistant',
                        content: `Your condition requires human intervention, please wait while we can connect a designated person to look at you. Thank you for your patience`
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