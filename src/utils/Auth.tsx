import { useState, type ReactNode } from "react";
import Login from "../component/Login";


type AuthProps = {
    children: ReactNode;
};

const Auth = ({ children }: AuthProps) => {

    const [reRander, setReRander] = useState(false)


    const authIngFn = () => {
        setReRander(!reRander)
        localStorage.setItem("auth", "true")
    }

    if (localStorage.getItem("auth") === "true") {
        return children
    } else {
        return <Login fn={authIngFn} />
    }
};

export default Auth;
