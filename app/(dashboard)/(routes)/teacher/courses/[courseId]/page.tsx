const CourseIdPage = (
    { params }: {
        params : { courseId : string }
    }
    ) => {
    return ( 
        <div>
            <p>Course Id: {params.courseId}</p>
        </div>
     );
}
 
export default CourseIdPage;