import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="drawer">
        <div className="drawer-content flex flex-col">
          <div className="navbar bg-base-300 w-full">
            <div className="mx-2 flex-1 px-2">
                <Link to="/">LOGO</Link>
            </div>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/create-blog">Create Blog</Link>
                </li>
                <li>
                  <Link to="/blogs">Blogs</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-5">
            <Outlet />

          </div>
        </div>
      </div>

    </>
  );
};

export default Layout;
