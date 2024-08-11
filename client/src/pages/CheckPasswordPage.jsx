import React, { useEffect,useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';
import { PiPassword, PiUserCircle } from "react-icons/pi";
import { Avatar } from '../components/Avatar';

const CheckPasswordPage = () => {
  const [data,setData] = useState({
    password : "",
  })
  const navigate = useNavigate()
 const location = useLocation()
    
       console.log("location",location.state);

                     // Redirect to email page  (url ekne password direction ekt ynna ba email eke direction ek fill krnn nathiw)
       useEffect(()=>{
        if(!location?.state?.name){
          navigate('/email')
        }
      },[])
      
       
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

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`

    try {
        const response = await axios.post(URL,data)

        toast.success(response.data.message)

        if(response.data.success){
            setData({
              password  : "",
            })
            navigate('/',{
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

         <div className='flex flex-col items-center justify-center mx-auto mb-2 w-fit'>
                {/*  <PiUserCircle
                  size={80}
                />  */}

                <Avatar
                  width={70}
                  height={70}
                  name={location?.state?.name}
                  imageUrl={location?.state?.profile_pic}
                 
                />

                     <h2 className='mt-1 text-lg font-semibold'>{location?.state?.name}</h2>
            </div>  

            

          <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
              

              <div className='flex flex-col gap-1'>
                <label htmlFor='password'>Password:</label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='enter your Password' 
                  className='px-2 py-1 bg-slate-100 focus:outline-primary'
                  value={data.password}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <button
               className='px-4 py-1 mt-2 text-lg font-bold leading-relaxed tracking-wide text-white rounded bg-primary hover:bg-secondary'
              >
                Login
              </button>

          </form>

          <p className='my-3 text-center'><Link to={"/forgot-password"} className='font-semibold hover:text-primary'>Forgot Password</Link></p>
        </div>
    </div>
  )
}

export default CheckPasswordPage