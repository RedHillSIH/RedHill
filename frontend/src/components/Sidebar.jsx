import React from "react";

const Sidebar = ({ selected }) => {


  return (
    <aside className="bg-[#75002b] text-white w-64 h-full flex flex-col">
      
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-4">
            <a
              href="/"
              className={`block px-4 py-2 rounded transition ${
                selected === "Home" ? "bg-[#930b3e]" : "hover:bg-[#930b3e]"
              }`}
            >
              Home
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className={`block px-4 py-2 rounded transition ${
                selected === "Complaints"
                  ? "bg-[#930b3e]"
                  : "hover:bg-[#930b3e]"
              }`}
            >
              Complaints
            </a>
          </li>
          <li>
            <a
              href="/profile"
              className={`block px-4 py-2 rounded transition ${
                selected === "Profile" ? "bg-[#930b3e]" : "hover:bg-[#930b3e]"
              }`}
            >
              Profile
            </a>
          </li>
        </ul>
      </nav>
      <footer className="text-center text-gray-400 p-4 border-t border-black">
        © 2024 Rail Madad
      </footer>
    </aside>
  );
};

export default Sidebar;
