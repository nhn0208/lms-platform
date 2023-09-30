import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import TitleForm from "./_components/TitleForm";
import {DescriptionForm} from "./_components/DescriptionForm";
import { ImageForm } from "./_components/ImageForm";
import { CategoryForm } from "./_components/CategoryForm";
import { PriceForm } from "./_components/PriceForm";
import { AttachmentForm } from "./_components/AttachmentForm";
import { ChapterForm } from "./_components/Chapter";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/Action";

const CourseIdPage = async (
    { params }: {
        params : { courseId : string }
    }
) => {
    const { userId } = auth();

    if (!userId) return redirect("/");

    const course = await db.course.findUnique({
        where: {
            id : params.courseId,
            userId
        },
        include: {
          chapters:{
            orderBy: {
              position:"asc"
            }
          },
          attachment: {
            orderBy: {
              createAt: "desc",
            },
          },
        },
    })

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })

    if (!course) return redirect("/");

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished)
    ]

    const totalFields = requiredFields.length;
    const completeFields = requiredFields.filter(Boolean).length;
    const completeText = `(${completeFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean)

    return (
        <>
          {!course.isPublished && (
            <Banner
              variant="warning"
              label="This chapter is unpublished. It will not be visible in the course"
            />
          )}
          <div className="p-6">
              <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-y-2">
                      <h1 className="text-2xl font-medium">Course Setup</h1>
                      <span className="text-sm text-slate-700">
                          Complete all fields {completeText}
                      </span>
                  </div>
                  <Actions disabled={!isComplete} courseId={course.id} isPublished={course.isPublished}/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                  <div>
                      <div className="flex items-center gap-x-2">
                          <IconBadge size="sm" icon={LayoutDashboard}/>
                          <h2 className="text-xl">
                              Customize your course
                          </h2>
                      </div>
                      <TitleForm initialData={course} courseId={course.id}/>
                      <DescriptionForm initialData={course} courseId={course.id}/>
                      <ImageForm initialData={course} courseId={course.id}/>
                      <CategoryForm 
                          initialData={course} 
                          courseId={course.id} 
                          options={categories.map((category) =>({
                              label: category.name,
                              value: category.id
                          }) )}
                      />
                  </div>
                  <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-x-2">
                          <IconBadge icon={ListChecks} />
                          <h2 className="text-xl">
                            Course chapters
                          </h2>
                        </div>
                        <div>
                          <ChapterForm 
                            initialData={course}
                            courseId={course.id} />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-x-2">
                          <IconBadge icon={CircleDollarSign} />
                          <h2 className="text-xl">
                            Sell your course
                          </h2>
                        </div>
                        <PriceForm
                          initialData={course}
                          courseId={course.id}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-x-2">
                          <IconBadge icon={File} />
                          <h2 className="text-xl">
                              Resources & Attachments
                          </h2>
                        </div>
                        <AttachmentForm
                          initialData={course}
                          courseId={course.id}
                        />
                      </div>
                  </div>
              </div>
          </div>
        </>
     );
}
 
export default CourseIdPage;