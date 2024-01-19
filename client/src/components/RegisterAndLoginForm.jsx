/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UseContext";

const RegisterAndLoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginOrRegister, setIsLoginOrRegister] = useState("login");
    const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLoginOrRegister === 'register' ? "register" : "login";
        const { data, status } = await axios.post(url, { username, password });
        if (status != 200) {
            alert(data);
        }
        setLoggedInUsername(username);
        setId(data.id);
    };

    return <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                >
                    Username
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                >
                    Password
                </label>
                <input
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="******************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    {isLoginOrRegister === "register" ? "Register" : "Login"}
                </button>
                <div className="text-center mt-2">

                    {isLoginOrRegister === "register" && (
                        <div>
                            Already a member ? {' '}
                            <button
                                className="ml-1"
                                onClick={() => {
                                    setIsLoginOrRegister("login");
                                }}
                            >
                                Login here
                            </button>
                        </div>
                    )}
                    {isLoginOrRegister === "login" && (
                        <div>
                            Don't have an account? {' '}
                            <button
                                className="ml-1"
                                onClick={() => {
                                    setIsLoginOrRegister("register");
                                }}
                            >
                                Register
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
            &copy;2020 Acme Corp. All rights reserved.
        </p>
    </div>  
};

export default RegisterAndLoginForm;