import { Outlet } from "react-router";
import Navbar from "../component/Nav";
import Auth from "../utils/Auth";






export default function Root() {
    return (
        <Auth>
            <div>
                <Navbar />
                <div className="max-w-6xl mx-auto px-4 pt-6">
                    <Outlet />
                </div>
            </div>
        </Auth>
    );
}
