import { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axion";
import Logo from "Logo";
import Contact from "Contact";
const Chat = ( ) => {
    return (
        <div className="flex h-screen">
            <div className="bg-white w-1/3 flex flex-col">
                <div className="flex-grow">
                    <Logo/>
                    <Contact username={"user1"}
                    id={"65a79752a8b86437a77103d4"}
                    online={true}
                    selected={true}/>
                    <Contact username={"user1"}
                    id={"65a79752a8b86437a77103d4"}
                    online={false}
                    selected={false}/>
                </div>
                <div className="p-2 text-center flex items-center justify-center">
                    <div className="mr-2 text-sm text-gray-600 flex items-center">
                        User
                    </div>
                </div>
            </div>
            <div className="flex flex-col bg-blue-50 w-2/3 p-2">
                <div className="flex-grow">
                    <div className="relative h-full flex-grow items-center justify-center">
                        <div className="text-gray-300">
                            &larr; Select a person from sidebar
                        </div>
                    </div>
                </div>
                <form action="flex gap-2">
                    <input type="text"
                    placeholder="Type your message"
                    className="bg-white flex-grow border rounded-sm p-2" />
                    <label  className="bg-blue-200 p-2 text-gray-600 cursor-pointer rounded-sm border border-blue-200">
                        <input type="file" className="hidden" />

                    </label>
                    <button type="submit"
                    className="bg-blue-500 p-2 text-white rounded-sm">

                    </button>
                </form>
            </div>
        </div>
    )
}