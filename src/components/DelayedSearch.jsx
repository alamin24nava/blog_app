import { useState } from "react"

const DelayedSearch = ()=>{
    const [searchValue, setSearchValue] = useState('')
    const handleSearch = (e)=>{
        setSearchValue(e.target.value) 
    }
    return(
        <input type="text" onChange={handleSearch} placeholder="Search here..." className="input input-bordered w-full max-w-xs" />
    )
}
export default DelayedSearch