import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { Categories } from "./_components/category"
import { SearchInput } from "@/components/search-input";

const SearchPage = async () => {
  const { userId } = auth();
  if (!userId) return redirect('/');

  const categories = await db.category.findMany({
    orderBy:{
      name: "asc"
    }
  })
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
          <SearchInput/>
      </div>
      <div className="p-6">
        <Categories items={categories} />
      </div>
    </>
  )
}

export default SearchPage