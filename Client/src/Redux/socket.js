import io from 'socket.io-client';

let socket;
const baseURL = "https://icom-okob.onrender.com";
// const baseURL = "http://localhost:5010";
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