import axios from 'axios'
import BackButton from "../components/BackButton"
import Spinner from '../components/Spinner'
import { useState,useEffect } from 'react'
import { useNavigate,useParams} from 'react-router-dom'
import { enqueueSnackbar, useSnackbar } from "notistack"


const EditBook = () => {
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [publishYear,setPublishYear] = useState('')
  const [loading,setLoading] = useState('')
  const navigate = useNavigate()
  const {id} = useParams()
  const {enqueueSnackbar} = useSnackbar()


  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:5555/books/${id}`)
    .then((res)=>{
      setTitle(res.data.title)
      setAuthor(res.data.author)
      setPublishYear(res.data.publishYear)
      setLoading(false)

    })
    .catch((err)=>{
      setLoading(false)
      console.log(err)
      alert('Some error occured')
    })
  },[])

  const handleEditBook = ()=>{
    const data = {
      title,
      author,
      publishYear
    }
    setLoading(true)
    axios.put(`http://localhost:5555/books/${id}`,data)
    .then(()=>{
      setLoading(false)
      enqueueSnackbar('Book updated successfully',{variant:'success'})
      navigate('/')
    })
    .catch((err)=>{
      enqueueSnackbar('Erro',{variant:'error'})
      console.log(err)
    })
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className="text-3xl my-4">Edit Book</h1>
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
            <button onClick={handleEditBook} className='p-2 m-8 bg-sky-300'>
              Save
            </button>
          </div>
        )
      }
    </div>
  )
}
export default EditBook