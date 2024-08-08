import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";

const CheckEmailPage = () => {
  const [data,setData] = useState({
    email : "",
  })
  const navigate = useNavigate()

  const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
          ...preve,
          [name] : value
      }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`

    try {
        const response = await axios.post(URL,data)

        toast.success(response.data.message)

        if(response.data.success){
            setData({
              email : "",
            })
            navigate('/password',{
              state : response?.data?.data
            })
        }
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
  }


  return (
    <div className='mt-5'>
        <div className='w-full max-w-md p-4 mx-auto overflow-hidden bg-white rounded'>

            <div className='mx-auto mb-2 w-fit'>
                <PiUserCircle
                  size={80}
                />
            </div>

          <h3>Welcome to Chat app!</h3>

          <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
              

              <div className='flex flex-col gap-1'>
                <label htmlFor='email'>Email :</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='enter your email' 
                  className='px-2 py-1 bg-slate-100 focus:outline-primary'
                  value={data.email}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <button
               className='px-4 py-1 mt-2 text-lg font-bold leading-relaxed tracking-wide text-white rounded bg-primary hover:bg-secondary'
              >
                Let's Go
              </button>

          </form>

          <p className='my-3 text-center'>New User ? <Link to={"/register"} className='font-semibold hover:text-primary'>Register</Link></p>
        </div>
    </div>
  )
}

export default CheckEmailPage