import Link from 'next/link'

import { Button } from '@/components/ui/button'

const CoursesPage = () => {
  return (
    <div>
      <Link href="/teacher/create">
        <Button className='p-6'>
          New Course
        </Button>
      </Link>
    </div>
  )
}

export default CoursesPage