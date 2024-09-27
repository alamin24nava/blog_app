const CreateAuthor = () => {
  return (
    <>
      <form className="flex gap-6">
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>-- Choose Category --</option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
        <input
          type="text"
          placeholder="Author Name..."
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn btn-primary">Create Author</button>
      </form>
    </>
  );
};
export default CreateAuthor;
