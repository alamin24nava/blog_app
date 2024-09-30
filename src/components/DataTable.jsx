const DataTable = ({ _onDataLists, _onTitle, _onHandleDelete, _onHandleEdit }) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>
                {_onTitle == "Category Name" ? "Category Name" : "Author Name"}
              </th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {_onDataLists?.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => _onHandleEdit(item)}
                      className="btn btn-neutral btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      // onClick={() => dispatch(deleteCategories(item.id))}
                      onClick={() => _onHandleDelete(item.id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default DataTable;
