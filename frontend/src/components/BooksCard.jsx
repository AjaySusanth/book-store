import { Link } from "react-router-dom"
import {MdOutlineDelete} from 'react-icons/md'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {PiBookOpenTextLight} from 'react-icons/pi'
import {BiUserCircle} from 'react-icons/bi'
import Card from "./Card"

const BooksCard = ({books}) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((item)=>(
            <Card key={item._id} book={item}/>
        ))}
    </div>
  )
}
export default BooksCard