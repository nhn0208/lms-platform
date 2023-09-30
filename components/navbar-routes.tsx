"use client"

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname} from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "./ui/button";
import { SearchInput } from "./search-input";

const NavbarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.includes("/chapter");
    const isSearchPage = pathname === "/search";

    return ( 
        <div className="w-full flex items-center justify-between">
            {isSearchPage && (
                <div className="md:block hidden ">
                <SearchInput />
                </div>
            )}
            <div className="flex gap-x-2 ml-auto">
                {isTeacherPage || isPlayerPage ? (
                    <Link href={"/"}>
                        <Button>
                            <LogOut className="w-4 h-4 mr-2"/>
                            Exit
                        </Button>
                    </Link>
                ):(
                    <Link href="/teacher/courses">
                        <Button size="sm" variant={'ghost'}>
                            Teacher mode
                        </Button>
                    </Link>
                )}
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
     );
}
 
export default NavbarRoutes;