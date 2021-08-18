import React, {useState} from "react";
import styled from "styled-components";
import { fb_auth, fb_instance } from "firebaseConfig";
import { useDispatch } from "react-redux";
import { refreshUser } from "_actions/user_actions";

const Container = styled.div`
    padding: 0 10px;
    background-color: white;
    padding-top: 6vh;
    height: 50vh;
    width: 40%;
    min-width: 280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
`

const Header = styled.div`
    font-weight: 600;
    font-size: 1.5em;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    width: 100%;
    flex-direction: column;
`;
const Input = styled.input`
    border-bottom: 2px solid rgba(0,0,0,0.3); 
    margin-bottom: 10px;
    width: 100%;
    ::placeholder{
        color: rgba(0,0,0,0.3);
    }
`;

const Button = styled.button`
    width: 100%;
    margin-bottom: 10px;
    cursor: pointer;
    padding: 0.5rem;
    border: 1px solid black;
    border-radius: 10px;
    :hover {
        background-color: rgba(0,0,0,0.3);
    }
`;
const Text = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin-bottom: 10px;
`;
const SocialContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

function Auth() {
    const dispatch = useDispatch();
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
        dispatch(refreshUser());
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
            // const result = 
            await fb_auth.signInWithPopup(provider);
            // const token = result.credential.accessToken;
            // const user = result.user;
        }
        catch (error){
            console.log(error)
        } finally{
            dispatch(refreshUser());
        }
    }
    const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
        <Container>
            <Header>Login</Header>
            <Form onSubmit={onSubmit}>
                <Input type="text" name="email" placeholder="Email" required onChange={onChange} />
                <Input type="password" name="password" placeholder="Password" required onChange={onChange} />
                <Button type="submit">{newAccount ? "Create Account" : "Log in"}</Button>
                {error}
            </Form>
            <Text onClick={toggleAccount}>{newAccount ? "login" : "create Account"}</Text>
            <SocialContainer>
                <Button onClick={socialOnClick} name="google">Continue with Google</Button>
                <Button onClick={socialOnClick} name="github">Continue with Github </Button>
            </SocialContainer>
        </Container>
    );
}

export default Auth;
