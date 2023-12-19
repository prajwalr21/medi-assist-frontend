import { Socket, io } from "socket.io-client"
import { Message } from "../interfaces/Chat"
import { Dispatch, SetStateAction } from "react"
import { SOCKET_SERVER_URL } from "../consts"
import { v4 as uuid } from 'uuid'

let socket: WebSocket | undefined

export const getSocket = () => {
    console.log(socket)
    return socket
}
export const setSocket = (chatData: Message[] | string, setMessage: Dispatch<SetStateAction<Message[]>>) => {
    socket = new WebSocket(`${SOCKET_SERVER_URL}?pid=${chatData as string}`)
    socket.onmessage = (message => {
        console.log('Recieved message from server', message.data)
        if (typeof message.data === 'string') {
            setMessage(prev => {
                return [
                    ...prev,
                    {
                        type: 'assistant',
                        content: message.data
                    } as Message
                ]
            })
        }
    })
    console.log('sending this to server', chatData)
    return socket

}