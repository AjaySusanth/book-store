import { AiOutlineClose } from "react-icons/ai"
import { PiBookOpenTextLight } from "react-icons/pi"
import { BiUserCircle } from "react-icons/bi"


const Modal = ({book,onClose}) => {
  return (
    <div 
    className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
    onClick={onClose}>
        <div 
        onClick={(e)=>e.stopPropagation()}
        className="relative flex flex-col p-4 rounded-xl bg-white w-[600px] h-[400px] max-w-full">
            <AiOutlineClose
            className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
            onClick={onClose}
            />

            <h2 className="w-fit px-4 py-1 rounded-lg bg-red-300">{book.publishYear}</h2>
            <h4 className="my-2 text-gray-500">{book._id}</h4>
            <div className="flex justify-start items-center gap-x-2">
                <PiBookOpenTextLight className="text-red-300 text-2xl"/>
                <h2 className="my-1">{book.title}</h2>
            </div>

            <div className="flex justify-start items-center gap-x-2">
                <BiUserCircle className="text-red-300 text-2xl"/>
                <h2 className="my-1">{book.author}</h2>
            </div>
            <h2 className="mt-4">About the Book</h2>
            <p className="my-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, quae cumque. Libero, harum minima. Laborum nam, aspernatur nobis similique maxime, ipsam consectetur molestias deserunt quas blanditiis assumenda praesentium atque consequuntur eaque facere saepe, optio et hic illum provident veritatis ad? Repellat molestias ipsa accusantium eaque? Sed expedita et provident eaque.
            </p>

        </div>

    </div>
  )
}
export default Modal