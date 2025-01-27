import axios from 'axios'
import BackButton from "../components/BackButton"
import Spinner from '../components/Spinner'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SnackbarProvider, useSnackbar } from "notistack"

const CreateBook = () => {
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [publishYear,setPublishYear] = useState('')
  const [loading,setLoading] = useState('')
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()

  const handleSaveBook = ()=>{
    const data = {
      title,
      author,
      publishYear
    }
    setLoading(true)
    axios.post('http://localhost:5555/books',data)
    .then(()=>{
      setLoading(false)
      enqueueSnackbar('Book created successfully',{variant:'success'})
      navigate('/')
    })
    .catch((err)=>{
      
      enqueueSnackbar('Error',{variant:'error'})
      console.log(err)
  })
}
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className="text-3xl my-4">Create Book</h1>
      {
        loading ? (
          <Spinner/>
        ) : (
          <div className='flex flex-col border-2 border-sky-500 rounded-xl w-[600px] p-4 mx-auto'>
            <div className="my-4">
              <lable className="mr-4 text-gray-400 text-xl">
                Title
              </lable>
              <input
              type='text'
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
              />
            </div>

            <div className="my-4">
              <lable className="mr-4 text-gray-400 text-xl">
                Author
              </lable>
              <input
              type='text'
              value={author}
              onChange={(e)=>setAuthor(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
              />
            </div>


            <div className="my-4">
              <lable className="mr-4 text-gray-400 text-xl">
                Publish Year
              </lable>
              <input
              type='text'
              value={publishYear}
              onChange={(e)=>setPublishYear(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
              />
            </div>
            <button onClick={handleSaveBook} className='p-2 m-8 bg-sky-300'>
              Save
            </button>
          </div>
        )
      }
    </div>
  )
}
export default CreateBook