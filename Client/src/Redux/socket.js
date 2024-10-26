import io from 'socket.io-client';

let socket;
const baseURL = import.meta.env.VITE_BASE_API_URL;
export const initiateSocketConnetion=()=>{
    if(!socket)
        socket = io(baseURL);
    return socket
}

export const disconnectSocket=()=>{
    if(socket)
        socket.disconnect();
}

export const getSocket=()=>socket;