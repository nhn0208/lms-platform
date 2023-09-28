
import { Compass, Layout } from "lucide-react";
import SidebarItem from "./sidebar-item";

const questRoutes = [
    {
        icon:Layout,
        label: "Dashboard",
        href: "/" 
    },
    {
        icon:Compass,
        label: "Browser",
        href: "/search" 
    }
]

const SidebarRoutes = () => {

    const routes = questRoutes;

    return ( 
        <div className="flex flex-col w-full">
            {routes.map((route)=>(
                <SidebarItem 
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
     );
}
 
export default SidebarRoutes;