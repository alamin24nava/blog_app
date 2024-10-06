import useOutsideClick from "../hooks/useOutsideClick";
import { useRef, useState } from "react";
const DropDownMenu = ({ _dropDownItems, _selected, _setSelected, _setSelectedId, name }) => {
    const [open, setOpen] = useState(false)
    const ref = useRef()
    useOutsideClick(ref, () => {
        setOpen(false)
    })
    const handleDropDown = ()=>{
        setOpen(!open)
    }
    const handleSelectedMenu = (selectedItem) => {
      _setSelected(selectedItem?.name);
      setOpen(false)
      _setSelectedId(selectedItem?.id)
    };
  return (
    <div ref={ref} className="dropdown w-full relative">
      <div onClick={handleDropDown} className="btn input-bordered w-full bg-transparent">{_selected}</div>
      <ul className={open ? "flex flex-col cursor-pointer border rounded-md":"hidden"}>
        {_dropDownItems?.map((item, index) => (
          <li  name={name} onClick={() => handleSelectedMenu(item)} key={index} className="p-2 border-b last:border-b-0">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default DropDownMenu;
