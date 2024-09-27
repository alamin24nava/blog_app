const CreateCategory = ()=>{
    return (
        <>
        <form className="flex gap-6">
            <input type="text" placeholder="Category Name..." className="input input-bordered w-full max-w-xs" />
            <button className="btn btn-primary">Create Category</button>
        </form>
        </>
    )
}
export default CreateCategory