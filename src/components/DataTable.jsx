const DataTable = () => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Quality Control Specialist</td>
              <td>
                <div className="flex gap-3 justify-end">
                  <button class="btn btn-neutral btn-sm">Edit</button>
                  <button class="btn btn-error btn-sm">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default DataTable;
