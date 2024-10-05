const TextArea = ({_onHandleChange, ...restProps})=>{
    return(
        <textarea onChange={_onHandleChange} className="textarea textarea-bordered" {...restProps}></textarea>
    )
}
export default TextArea