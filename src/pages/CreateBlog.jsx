import { useEffect, useState } from "react";
import DropDownMenu from "../components/DropDownMenu";
import Input from "../components/Input";
import DataTable from "../components/DataTable";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  tagsGetuseSelector,
  getTags,
  postTags,
  deleteTags,
  updateTags,
} from "../features/tags/tagsSlice";
import {categoriesGetuseSelector, getCategories} from "../features/categories/categoriesSlice"
import {authorsGetuseSelector, getAuthors} from "../features/authors/authorsSlice"
import {postBlogs} from "../features/blogs/blogsSlice"
import TextArea from "../components/TextArea";
const CreateBlog = () => {
//   const [tagName, setTagName] = useState("");
  const [editableTag, setEditableTag] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
//   const [selected, setSelected] = useState('-- Select --')
const [as, setAs] = useState('-- Select 2 --')
  const [onchangeValues, setOnchangeValues] = useState({
    // postedCategory:[{name:'jjjjj'}],
    postedCategory:"-- Select --",
    postedAuthor:"-- Select --",
    postedTags:[],
    postTitle: "",
    postDesc: "",
    tagName:""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOnchangeValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
//   const handleSelectedMenu = (selectedItem)=>{
//     setOnchangeValues(selectedItem.name)
//   }
  const { tagList } = useSelector(tagsGetuseSelector);
  const { categoryList } = useSelector(categoriesGetuseSelector);
  const { authorList } = useSelector(authorsGetuseSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTags());
  }, []);
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  useEffect(() => {
    dispatch(getAuthors());
  }, [getAuthors]);

  const handleDeleteTag = (tagId) => {
    dispatch(deleteTags(tagId));
    setOnchangeValues({tagName:""})
    setEditableTag(null)
  };
  const handleEditTag = (tag) => {
    setEditableTag(tag);
    setOnchangeValues({tagName:tag.name});
  };
  const handleSubmit = (e, action) => {
    e.preventDefault();
    if(action == "tagForm"){
        if (onchangeValues.tagName.trim() == "") {
            return toast.error("Please Provide Something..");
          }
          const isDuplicate = tagList.find((item) => item.name === onchangeValues.tagName);
          if (isDuplicate) {
            setOnchangeValues({tagName:''});
            setEditableTag(null)
            return toast.error("Already Added This Tag");
          }
          if (editableTag == null) {
            const newTag = { name: onchangeValues.tagName };
            dispatch(postTags(newTag));
            toast.success("Successfully created!");
          } else {
            const newTag = { name: onchangeValues.tagName, id: editableTag.id };
            dispatch(updateTags(newTag));
          }
          setOnchangeValues({tagName:''});
    }else if(action == "postForm"){
        const newBlog = {
            category_id:selectedId,
            // author_id:onchangeValues.postedAuthor,
            // tags:onchangeValues.postedTags,
            title:onchangeValues.postTitle,
            description:onchangeValues.postDesc
        }
        dispatch(postBlogs(newBlog))
    }
    setOnchangeValues({tagName:''});
    setEditableTag(null)
  };
  return (
    <div className="flex gap-6">
      <form className="border flex flex-col gap-4 p-6 rounded-md w-full"
          onSubmit={(e) => handleSubmit(e, "postForm")}
        >
        <DropDownMenu
            _dropDownItems={categoryList}
            _selected={as}
            _setSelected={setAs}
            _setSelectedId={setSelectedId}
        />
        {/* <DropDownMenu
          _dropDownItems={categoryList} 
          _selected={onchangeValues.postedCategory} 
          _setSelected={setOnchangeValues}
          _setSelectedId={setSelectedId}
          name="postedCategory"
        /> */}
        {/* <DropDownMenu 
          _dropDownItems={authorList} 
          _selected={onchangeValues.postedAuthor} 
        //   _onHandleSelectedMenu={handleSelectedMenu}
        /> */}
        <Input
            name="postTitle"
            placeholder="Post Title"
            _onHandleChange={handleChange}
        />
        <TextArea name="postDesc"  _onHandleChange={handleChange} placeholder="Post Description"/>
        <button className="btn btn-primary">Create Post</button>
      </form>

      <div className="border p-6 rounded-md w-full">
        <form
          onSubmit={(e) => handleSubmit(e, "tagForm")}
          className="flex gap-6 mb-6 border-b pb-6"
        >
          <Input
            _onHandleChange={handleChange}
            _onchangeValue={onchangeValues.tagName}
            name="tagName"
            placeholder="Tag Name"
          />
          <button className="btn btn-primary">{editableTag == null ? "Create Tag":"Update Tag"}</button>
        </form>
        <DataTable
          _onHandleEdit={handleEditTag}
          _onHandleDelete={handleDeleteTag}
          _dataLists={tagList}
          _title="Tags List"
          _th2="Tags Name"
        />
      </div>
    </div>
  );
};
export default CreateBlog;
