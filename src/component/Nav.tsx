import { NavLink } from "react-router";
import {
  LayoutDashboard,
  ArrowLeftRight,
  PlusCircle,
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
  {
    name: "Add",
    path: "/add",
    icon: PlusCircle,
  },
];

export default function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600">
            💰 MyBank
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={20} />
                <span className="font-medium">{link.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-3">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center py-2 transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`
                }
              >
                <Icon size={22} />
                <span className="mt-1 text-xs font-medium">
                  {link.name}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}