import { useState, type ReactNode } from "react";
import Login from "../component/Login";


type AuthProps = {
    children: ReactNode;
};

const Auth = ({ children }: AuthProps) => {
    const [auth, setAuth] = useState<boolean>(false)

    const authIngFn = () => {
        setAuth(true)
    }

    if (auth) {
        return children
    } else {
        return <Login fn={authIngFn} />
    }
};

export default Auth;
