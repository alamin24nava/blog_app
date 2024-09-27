import CreateCategory from "../components/CreateCategory";
import CreateAuthor from "../components/CreateAuthor";
import DataTable from "../components/DataTable";
import GlobalLoading from "../components/GlobalLoading";

const Home = () => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex gap-6">
          <div className="border p-6 rounded-md w-full">
            <CreateCategory />
          </div>
          <div className="border p-6 rounded-md w-full">
            <DataTable />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="border p-6 rounded-md w-full">
            <CreateAuthor />
          </div>
          <div className="border p-6 rounded-md w-full">
            <DataTable />
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
