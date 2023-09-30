import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: {params: { courseId: string }}
) {
    try {
        const { userId } = auth();
        if (!userId) return new NextResponse("Unauthozied",{status:401})

        const course = await db.course.findUnique({
            where: {
              id: params.courseId,
              userId,
            },
            include: {
              chapters: {
                include: {
                  muxData: true,
                }
              }
            }
          });
        if (!course) return new NextResponse("Not found",{status:404})


        const unpublishedCourse = await db.course.update({
            where: {
                id: course.id,
                userId,
            },
            data: {
                isPublished: false
            }
        })

        return NextResponse.json(unpublishedCourse);
    }catch(error){
        console.log("[COURSE_UNPUBLISHED]",error);
        return new NextResponse("Internal Error",{status:500})
    }
}