import React, {useState} from 'react'
import axios from 'axios'

export default ()=>{
    const [title, setTitle] = useState('')
    const onSubmit = async (event) => {
        event.preventDefault()
        await axios.post('http://localhost:4000/posts/',{
            title // dont u dare put extra , like golang here, otherwise this piece of shit takes it as an array here 
        }).catch(err => {
            console.log(err.message)
        })
        setTitle('')
    }
    return <div>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label> Title</label>
                <input 
                  value = {title}
                  onChange={e => setTitle(e.target.value)}
                  className='form-control'>
                </input>
            </div>
            <button className='btn btn-primary'>Submit</button>
        </form>
    </div>
}