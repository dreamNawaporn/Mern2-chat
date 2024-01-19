import React from "react";

const Contact = ({username}) => {
    return (
       
        <div className={"borer-b border-gray-100 flex items-center gap-2 cursor-pointer bg-blue-50" + (Selection ? "bg-blue-50" : "")}>
             {selected && <div className="w-1 bg-blue-500 h-12 rounded-r-md"></div>}
            <div className="flex gap-2 py-2 pl-4 items-center">
                <spas className="text-gray-800">{username}</spas>
            </div>
        </div>
    );
};

export default Contact