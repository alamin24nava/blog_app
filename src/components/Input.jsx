const Input = ({_onHandleChange, _onchangeValue, ...restProps})=>{
    return(
        <input
        onChange={(e) => _onHandleChange(e)}
        value={_onchangeValue}
        type="text"
        className="input input-bordered w-full"
        {...restProps}
      />
    )
}
export default Input