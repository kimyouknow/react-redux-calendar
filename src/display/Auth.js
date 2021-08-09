import { fb_auth, fb_instance } from "firebaseConfig";
import React, {useState} from "react";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if (name === "email") {
            setEmail(value);
        } else {
            setPassword(value);
        }
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            if(newAccount){
                await fb_auth.createUserWithEmailAndPassword(email, password)
            } else {
                await fb_auth.signInWithEmailAndPassword(email, password)
            }
            setNewAccount((prev) => !prev);
        } catch (error) {
            setError(error.message);
        }
        setEmail("");
        setPassword("");
    }
    const socialOnClick = async(event)=> {
        const {target: {name}} = event;
        try{
            let provider
            if(name ==="google"){
                provider = new fb_instance.auth.GoogleAuthProvider();
                provider.addScope("email")
            } else {
                provider = new fb_instance.auth.GithubAuthProvider();
                provider.addScope('profile');
                provider.addScope("email");
            }
            const result = await fb_auth.signInWithPopup(provider);
            // const token = result.credential.accessToken;
            // const user = result.user;
        }
        catch (error){
            console.log(error)
        }
    }
    const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" name="email" placeholder="Email" required onChange={onChange} />
                <input type="password" name="password" placeholder="Password" required onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log in"}/>
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "login" : "create Account"}</span>
            <div>
                <button onClick={socialOnClick} name="google">Continue with Google</button>
                <button onClick={socialOnClick} name="github">Continue with Github </button>
            </div>
        </div>
    );
}

export default Auth;
