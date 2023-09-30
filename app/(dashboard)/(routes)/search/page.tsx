import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { Categories } from "./_components/category"

const SearchPage = async () => {
  const { userId } = auth();
  if (!userId) return redirect('/');

  const categories = await db.category.findMany({
    orderBy:{
      name: "asc"
    }
  })
  return (
    <div className="p-6">
      <Categories items={categories} />
    </div>
  )
}

export default SearchPage