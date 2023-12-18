import { Socket, io } from "socket.io-client"
import { Message } from "../interfaces/Chat"
import { Dispatch, SetStateAction } from "react"
import { SOCKET_SERVER_URL } from "../consts"

let socket: Socket | undefined

export const getSocket = () => {
    console.log(socket)
    return socket
}
export const setSocket = (chatData: Message[] | string, setMessage: Dispatch<SetStateAction<Message[]>>) => {
    socket = io(SOCKET_SERVER_URL)
    socket.on('server', message => {
        setMessage(prev => {
            return [
                ...prev,
                {
                    type: 'assistant',
                    content: message
                } as Message
            ]
        })
    })
    socket.on('chat-data', (data) => {
        setMessage(data)
    })
    console.log('sending this to server', chatData)
    socket?.emit('chat-data', chatData)
    return socket

}