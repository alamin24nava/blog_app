import DataNotFound from "./DataNoFound";
import DelayedSearch from "./DelayedSearch";
const DataTable = ({
  _dataLists,
  _onHandleDelete,
  _onHandleEdit,
  _title,
  _th2,
  _th3,
  _categoryList,
}) => {

  return (
    <>
      {_dataLists.length > 0 ? (
        <div>
          <DelayedSearch />
          <h3 className="text-2xl">{_title}</h3>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>{_th2}</th>
                  {_categoryList &&  <th>{_th3}</th>}
                 
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {_dataLists &&
                  _dataLists?.map((item, index) => {
                    const findedCategory = _categoryList?.find((findId)=> findId.id === item.category_id)
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{item.name}</td>
                        {findedCategory && 
                        
                        <td>{findedCategory?.name}</td>}
                        <td>
                          <div className="flex gap-3 justify-end">
                            <button
                              onClick={() => _onHandleEdit(item)}
                              className="btn btn-neutral btn-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => _onHandleDelete(item.id)}
                              className="btn btn-error btn-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <DataNotFound />
      )}
    </>
  );
};
export default DataTable;
