import { useState } from "react"
import BackButton from "../components/BackButton"
import { useNavigate,useParams } from "react-router-dom"
import axios from 'axios'
import Spinner from "../components/Spinner"
import { enqueueSnackbar, useSnackbar } from "notistack"


const DeleteBook = () => {
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()
  const {enqueueSnackbar} = useSnackbar()

  const handleDeleteBook = ()=>{
    setLoading(true)
    axios.delete(`http://localhost:5555/books/${id}`)
    .then((res)=>{
      setLoading(false)
      enqueueSnackbar('Book deleted successfully',{variant:'success'})
      navigate('/')
    })
    .catch((err)=>{
      setLoading(false)
      enqueueSnackbar('Erro',{variant:'error'})
      console.log(err)
    })
  }


  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className="text-3xl my-4">Delete Book</h1>
      {
        loading ? <Spinner/> : ''
      }
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl p-8 w-[600px] mx-auto">
        <h3 className="text-2xl">
          Are you sure you want to delete ?
        </h3>

        <button
        className="bg-red-600 text-white m-8 w-full p-4"
        onClick={handleDeleteBook}
        >
          Yes
        </button>
      </div>

    </div>
  )
}
export default DeleteBook