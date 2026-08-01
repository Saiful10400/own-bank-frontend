import { useState } from "react";
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  ArrowLeftRight,
  PlusCircle,
  Wallet,
  ChevronDown,
  ChevronUp,
  Landmark,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Transactions",
    path: "/transactions",
    icon: ArrowLeftRight,
  },
];

export default function Sidebar() {
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white border-r shadow-sm flex-col">
        <div className="h-16 flex items-center px-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600">
            💰 MyBank
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`
                }
              >
                <Icon size={20} />
                {link.name}
              </NavLink>
            );
          })}

          {/* Add Menu */}
          <button
            onClick={() => setOpenAdd(!openAdd)}
            className="w-full flex items-center justify-between rounded-lg px-4 py-3 hover:bg-gray-100 text-gray-700"
          >
            <div className="flex items-center gap-3">
              <PlusCircle size={20} />
              <span>Add</span>
            </div>

            {openAdd ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>

          {openAdd && (
            <div className="ml-5 border-l pl-4 space-y-1">
              <NavLink
                to="/add/transaction"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-md px-3 py-2 ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-100"
                  }`
                }
              >
                <Wallet size={18} />
                Transaction
              </NavLink>

              <NavLink
                to="/add/investment"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-md px-3 py-2 ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-100"
                  }`
                }
              >
                <Landmark size={18} />
                Investment
              </NavLink>
            </div>
          )}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        {openAdd && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-52 rounded-xl bg-white shadow-xl border p-2">
            <NavLink
              to="/add/transaction"
              onClick={() => setOpenAdd(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              <Wallet size={20} />
              Transaction
            </NavLink>

            <NavLink
              to="/add/investment"
              onClick={() => setOpenAdd(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              <Landmark size={20} />
              Investment
            </NavLink>
          </div>
        )}

        <div className="grid grid-cols-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center py-2 ${
                isActive ? "text-blue-600" : "text-gray-500"
              }`
            }
          >
            <LayoutDashboard size={22} />
            <span className="text-xs mt-1">Home</span>
          </NavLink>

          <button
            onClick={() => setOpenAdd(!openAdd)}
            className="flex flex-col items-center py-2 text-blue-600"
          >
            <PlusCircle size={26} />
            <span className="text-xs mt-1">Add</span>
          </button>

          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `flex flex-col items-center py-2 ${
                isActive ? "text-blue-600" : "text-gray-500"
              }`
            }
          >
            <ArrowLeftRight size={22} />
            <span className="text-xs mt-1">History</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
}