import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { Categories } from "./_components/category"
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/course-list";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const SearchPage = async ({
  searchParams
}: SearchPageProps) => {
  const { userId } = auth();
  if (!userId) return redirect('/');

  const categories = await db.category.findMany({
    orderBy:{
      name: "asc"
    }
  })

  const courses = await getCourses({
    userId,
    ...searchParams,
  });
  
  return (
    <div className="p-6">
      <div className="md:hidden md:mb-0 block">
          <SearchInput/>
      </div>
      <div className="space-y-4 pb-6">
        <Categories items={categories} />
      </div>
      <CoursesList items={courses} />
    </div>
  )
}

export default SearchPage