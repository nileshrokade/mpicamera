import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";

 
export const Join= () => {
 

    const {socket}=useContext(RoomContext)
    
    const createRoom=()=>{
        console.log("createRoom clicked");
        if(socket){ 
            socket.emit("create-room");
        }   
    }   


    return (
        <div className=" flex flex-col">

            <button onClick={createRoom}   className="py-2 px-8 text-xl">
                Start new meeting
            </button>
        </div>
    );
};
