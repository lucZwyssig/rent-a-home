import { useState } from "react";
import axios  from "axios";

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(){

        
        try{
            const response = await axios.post("http://localhost:3001/api/login", {
                withCredentials: true,
                username: username,
                password: password
            });
            sessionStorage.setItem("token", response.data.token);
        } catch (error){
            console.log(error);
        };
    };
    async function handleRegister(){
        try{
            const response = await axios.post("http://localhost:3001/api/register", {
                withCredentials: true,
                username: username,
                password: password
            });
            sessionStorage.setItem("token", response.data.token);
        } catch (error){
            if(error.response && error.response.status === 409){
                //handle conflict
            }
        };        
    };

    return(
        <div>
            <input type="text" value={username} placeholder="enter username" onChange={(e) => setUsername(e.target.value)}></input>
            <input type="password" value={password} placeholder="enter password" onChange={(e) => setPassword(e.target.value)}></input>
            <input type="button" onClick={handleLogin} value="submit"></input>
            <input type="button" onClick={handleRegister} value="register instead"></input>
        </div>
    );
}; export default Login;