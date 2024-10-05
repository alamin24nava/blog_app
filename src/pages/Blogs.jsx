import { useDispatch, useSelector } from "react-redux"
import Card from "../components/Card"
import {blogsGetuseSelector, getBlogs} from "../features/blogs/blogsSlice"
import { useEffect } from "react"
const Blogs = ()=>{
    const dispatch = useDispatch()
    const {blogList} = useSelector(blogsGetuseSelector)
    useEffect(()=>{
        dispatch(getBlogs())
    },[])
    return (
        <>
        <Card _dataLists = {blogList}/>
        </>
    )
}
export default Blogs