import { createContext } from 'react';
import socketIOClient from 'socket.io-client'
export const RoomContext = createContext<null | any>(null);  
export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
 const ws="http://localhost:8080";
const socket = socketIOClient(ws);
  return (

    <RoomContext.Provider value={{ socket }}>
      {children}
    </RoomContext.Provider>
  );
} 

