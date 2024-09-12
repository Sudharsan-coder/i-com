import io from 'socket.io-client';

let socket;

export const initiateSocketConnetion=()=>{
    if(!socket)
        socket = io("http://localhost:5010");
    return socket
}

export const disconnectSocket=()=>{
    if(socket)
        socket.disconnect();
}

export const getSocket=()=>socket;