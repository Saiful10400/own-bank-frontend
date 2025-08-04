import React, { useMemo, type PropsWithChildren } from 'react';
import ContextProvider from './contextFn';
import { io } from 'socket.io-client';




const ContextWrapper: React.FC<PropsWithChildren> = (props) => {

    const socket = useMemo(() => io("http://localhost:5000"), [])

    // pear connection.
    const pearConnection = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] })



    //  context value.
    const value = { socket, pearConnection }



    return (
        <ContextProvider.Provider value={value}>
            {props.children}
        </ContextProvider.Provider>
    );
};

export default ContextWrapper;