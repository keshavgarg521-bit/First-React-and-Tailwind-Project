import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice'

const ViewPaste = () => {
   const {id} = useParams();
   
   const allPastes = useSelector(
    (state) =>state.paste.pastes
   );

   const paste = allPastes.filter((p) => p._id === id)[0];
   console.log(paste);
  
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
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
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
        value={paste.content}
        disabled
        onChange={(e) => setValue(e.target.value)}
        rows={20}
      />
      </div>
    </div>
  )
}

export default ViewPaste