import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  console.log(pastes)
  const [searchTitle, setSearchTitle] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTitle.toLowerCase()),
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div>
      <input
        className="bg-gray-800 text-white px-3 py-2 rounded-xl  mt-5
      border border-gray-600 min-w-[900px]
      shadow-md shadow-black/30
      outline-none 
      focus:border-purple-500 
      focus:shadow-purple-500/20"
        type="search"
        placeholder='Search here'
        value={searchTitle}
        onChange={(e) => searchTitle(e.target.value)}
      />

      <div className='flex items-center flex-col gap-5 mt-5'>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
                <div className=' flex flex-col justify-center border items-center min-w-[900px] py-2'>
                  <div>
                    {paste.title}
                  </div>
                  <div>
                    {paste.content}
                  </div>
                  <div className="flex justify-evenly items-center w-full mt-2">
                    <button className="bg-gray-700 text-white px-2 py-1 rounded-xl 
                     shadow-md shadow-black/30
                     hover:bg-purple-600 transition">
                      <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                    </button >
                    <button className="bg-gray-700 text-white px-2 py-1 rounded-xl 
                     shadow-md shadow-black/30
                     hover:bg-purple-600 transition">
                      <a href={`/pastes/${paste?._id}`}>View</a>
                    </button>
                    <button className="bg-gray-700 text-white px-2 py-1 rounded-xl 
                     shadow-md shadow-black/30
                     hover:bg-purple-600 transition" onClick={() => {
                        navigator.clipboard.writeText(paste?.content)
                        toast.success("Coppied to Clipboard")
                     }}>
                      Copy
                    </button>
                    <button className="bg-gray-700 text-white px-2 py-1 rounded-xl 
                     shadow-md shadow-black/30
                     hover:bg-purple-600 transition">
                      Share
                    </button>
                    <button className="bg-gray-700 text-white px-2 py-1 rounded-xl 
                     shadow-md shadow-black/30
                     hover:bg-purple-600 transition" onClick={() => 
                     handleDelete(paste?._id)}>
                      Delete
                    </button>
                  </div>
                  <div>
                    {paste.createdAt}
                  </div>
                </div>
              )
            }
          )
        }
      </div>

    </div>
  )
}

export default Paste