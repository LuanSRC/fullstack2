import { NavLink } from "react-router-dom";

export default function Navbar({ items = [] }) {
  return (
    <nav aria-label="Principal" className="bg-gray-800 text-white shadow-md">
      <ul className="flex gap-6 px-6 py-3">
        {items.map(({ to, label, disabled }, idx) => {
          if (disabled) {
            return (
              <li key={idx} aria-disabled="true">
                <span className="opacity-50 cursor-not-allowed">{label}</span>
              </li>
            );
          }

          return (
            <li key={idx}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  [
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  ].join(" ")
                }
              >
                {label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
