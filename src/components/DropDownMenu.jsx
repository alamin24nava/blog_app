import { useState } from "react";

const DropDownMenu = ({ _dropDownItems}) => {
  const [selected, setSelected] = useState("--Select--");
//   const handleSelectedMenu = (e)=>{
//     setSelected(e.target.value)
//   }

  const handleSelectedMenu = (name) => {
    // Handle the selected menu item
    setSelected(name);
  };
  
  return (
    <div className="dropdown w-full">
      <div tabIndex={0} role="button" className="btn m-1 w-full">
        {selected}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow"
      >
        {_dropDownItems?.map((item, index) => (
        //   <li onClick={handleSelectedMenu} value={item.name} key={index}>{item.name}</li>
        <li onClick={() => handleSelectedMenu(item.name)} key={index}>
  {item.name}
</li>
        // <input onClick={handleSelectedMenu} type="button" value={item.name}  key={index} name="" id="" />
        ))}
      </ul>
    </div>
  );
};
export default DropDownMenu;
