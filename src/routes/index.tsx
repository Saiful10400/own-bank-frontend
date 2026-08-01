
import { createBrowserRouter } from "react-router";

import Root from "../page/Root";
import Dashboard from "../page/Dashboard";
import AddTransaction from "../page/AddTransaction";
import Transactions from "../page/Transactions";
import AddInvestment from "../page/AddInvestment";
import Investments from "../page/Investments";


const routes = createBrowserRouter([
    {
        path: "/", element: <Root />, children: [
            { index: true, element: <Dashboard /> },
            { path: "add", children: [{ path: "transaction", element: <AddTransaction /> },{ path: "investment", element: <AddInvestment /> }] },
            { path: "transactions", element: <Transactions /> },
            {path: "investments", element: <Investments/>},
        ]
    }
]);


export default routes