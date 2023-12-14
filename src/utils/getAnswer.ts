import axios from "axios";
import { Message } from "../interfaces/Chat";
import { SERVER_URL } from "../consts";
import { getNextOperation } from "./operationCycle";

export const getAnswer = async (messages: Message[]): Promise<Message> => {
    const context = messages.map(message => {
        return {
            content: message.content
        }
    })
    const response = await axios.post(`${SERVER_URL}/getAnswer`, {
        messages: context,
        'operation-type': getNextOperation()
    })
    const { type, content } = response.data
    return {
        type,
        content
    } as Message
}