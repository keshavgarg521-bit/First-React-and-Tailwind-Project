import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice'

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams , setSearchParams] = useSearchParams();

  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if(pasteId){
      const  paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId])
  

  function createPaste() {
      const paste = {
        title: title,
        content: value,
        _id: pasteId || Date.now().toString(32),
        createdAt: new Date().toISOString(),
      }

      if(pasteId){
        //update
        dispatch(updateToPastes(paste));
      }
      else{
        //create
        dispatch(addToPastes(paste));
      }

      //after updating or searching
      setTitle('');
      setValue('');
      setSearchParams({});

  }

  return (
    <div className="w-full flex  flex-col items-center mt-7">

      {/* Input + Button */}
      <div className="flex gap-3">
        <input
          className="bg-gray-800 text-white px-4 py-2 rounded-xl 
                     border border-gray-600 
                     shadow-md shadow-black/30
                     outline-none 
                     focus:border-purple-500 
                     focus:shadow-purple-500/20"
          type="text"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="bg-gray-700 text-white px-4 py-2 rounded-xl 
                     shadow-md shadow-black/30
                     hover:bg-purple-600 transition"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>

      </div>

     <div>
      {/* Textarea */}
      <textarea
        className="mt-5 min-w-[800px] bg-gray-800 text-white 
                   p-4 rounded-xl border border-gray-600 
                   shadow-md shadow-black/30
                   outline-none 
                   focus:border-purple-500 
                   focus:shadow-purple-500/20 resize-none"
        placeholder="Enter the context here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={20}
      />
      </div>
    </div>
  )
}

export default Home