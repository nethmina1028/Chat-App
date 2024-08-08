import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';

const RegisterPage = () => {

           const [data,setData] = useState({
             name : "",
             email : "",
             password : "",
             profile_pic : ""
           })

           const [uploadPhoto,setUploadPhoto] = useState("")

           const handleOnChange = (e)=>{
            const { name, value} = e.target
        
            setData((preve)=>{
              return{
                  ...preve,
                  [name] : value
              }
            })
          }


          const handleUploadPhoto = async(e)=>{
            const file = e.target.files[0]
            
           const uploadPhoto = await uploadFile(file)   // uploadFile is a function from helpers/uploadFile.js to cloudinary1
          // console.log("uploadPhoto",uploadPhoto);        //cloudinary2
            setUploadPhoto(file)                         //cloudinary3

          
                  //save photo url to in state
            setData((preve)=>{
              return{
                ...preve,
                profile_pic : uploadPhoto?.url
              }
            })
          }

          const handleClearUploadPhoto = (e)=>{
            e.stopPropagation()
            e.preventDefault()
            setUploadPhoto(null)
          }

          const handleSubmit = (e)=>{
            e.preventDefault()
            e.stopPropagation()
            console.log(data)
          }

  return (
    <div className='mt-5'>
            <div className='w-full max-w-md p-4 mx-auto overflow-hidden bg-white rounded'>
             <h3>Welcome to Chat app!</h3>
              
             <form className='grid gap-4 mt-5'onSubmit={handleSubmit}>

             <div className='flex flex-col gap-1'>
                <label htmlFor='name'>Name :</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='enter your name' 
                  className='px-2 py-1 bg-slate-100 focus:outline-primary'
                  value={data.name}
                  onChange={handleOnChange}
                  required
                />
              </div>

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

              <div className='flex flex-col gap-1'>
                <label htmlFor='password'>Password :</label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='enter your password' 
                  className='px-2 py-1 bg-slate-100 focus:outline-primary'
                  value={data.password}
                  onChange={handleOnChange}
                  required
                />
              </div>


              
              <div className='flex flex-col gap-1'>
                <label htmlFor='profile_pic'>Photo :

                  <div className='flex items-center justify-center border rounded cursor-pointer h-14 bg-slate-200 hover:border-primary'>
                      <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                        {
                          uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"
                        }
                      </p>
                      {
                        uploadPhoto?.name && (
                          <button className='ml-2 text-lg hover:text-red-600' onClick={handleClearUploadPhoto}>
                            <IoClose/>
                          </button>
                        )
                      }
                      
                  </div>
                
                </label>
                
                <input
                  type='file'
                  id='profile_pic'
                  name='profile_pic'
                  className='hidden px-2 py-1 bg-slate-100 focus:outline-primary'
                  onChange={handleUploadPhoto}
                />
              </div>

              <button
               className='px-4 py-1 mt-2 text-lg font-bold leading-relaxed tracking-wide text-white rounded bg-primary hover:bg-secondary'
              >
                Register
              </button>


              </form>

              <p className='my-3 text-center'>Already have account ? <Link to={"/email"} className='font-semibold hover:text-primary'>Login</Link></p>
            </div>
    </div>
  )
}

export default RegisterPage