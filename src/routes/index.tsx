
import { createBrowserRouter } from "react-router";

import Root from "../page/Root";
import Dashboard from "../page/Dashboard";
import AddTransaction from "../page/AddTransaction";
import Transactions from "../page/Transactions";


const routes = createBrowserRouter([
    {
        path: "/", element: <Root />, children: [
            { index: true, element: <Dashboard /> },
            { path: "add", element: <AddTransaction /> },
            { path: "transactions", element: <Transactions /> },
        ]
    }
]);


export default routes