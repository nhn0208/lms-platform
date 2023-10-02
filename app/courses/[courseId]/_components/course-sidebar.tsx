import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { auth } from "@clerk/nextjs"
import { Chapter, Course, UserProgress } from "@prisma/client"
import { Lock } from "lucide-react"
import { redirect } from "next/navigation"
import CourseSidebarItem from "./course-sidebar-item"

interface CourseSidebarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null
        })[]
    },
    progressCount: number
}

const CourseSidebar = async ({course,progressCount}:CourseSidebarProps) => {
    const { userId }= auth();
    if (!userId) {
        return redirect("/");
      }
    const purchase = await db.purchase.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId: course.id,
          }
        }
    });

    return ( 
        <div className="w-full h-full border-r felx flex-col overflow-y-auto bg-white shadow-sm">
            <div className="w-full border-b p-8">
                <h1 className="font-semibold line-clamp-2">
                    {course.title}
                </h1>
            </div>
            <div className="flex flex-col w-full">
                {course.chapters.map(chapter =>{
                    return (
                        <CourseSidebarItem 
                            key={chapter.id} 
                            id={chapter.id}
                            label={chapter.title}
                            isComplete={!!chapter.userProgress?.[0]?.isComplete}
                            courseId={course.id}
                            isLocked={!chapter.isFree && !purchase} />
                    )
                })}
            </div>
        </div>
     );
}
 
export default CourseSidebar;