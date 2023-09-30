"use client"

import Logo from "./logo";
import SidebarRoutes from "./sidebarRoutes";

const Sidebar = () => {
    return ( 
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">

            {/* Logo */}
            <div className="p-6 mb-[6px]">
                <Logo/>
            </div>

            {/* Sidebar Routes */}
            <div className="flex flex-col w-full">
                <SidebarRoutes/>
            </div>
        </div>
     );
}
 
export default Sidebar;