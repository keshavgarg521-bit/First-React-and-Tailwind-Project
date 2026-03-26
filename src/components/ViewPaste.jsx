import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice'

const ViewPaste = () => {
  const { id } = useParams();

  const allPastes = useSelector(
    (state) => state.paste.pastes
  );

  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log(paste);

return (
  <div className="w-full flex flex-col items-center mt-7">

    {/* TITLE */}
    <div className="flex gap-3">
      <input
        className="bg-gradient-to-r from-gray-800 to-gray-900 
        text-white px-5 py-2 rounded-xl 
        border border-gray-700 
        shadow-md
        text-center font-medium
        outline-none"
        type="text"
        value={paste.title}
        disabled
      />
    </div>

    {/* CONTENT BOX */}
    <div className="relative mt-5">

      {/* COPY BUTTON (FIXED) */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(paste.content);
          toast.success("Copied ✅");
        }}
        className="absolute top-3 right-3 
        bg-white/20 hover:bg-white/30 
        text-white px-3 py-1 rounded-lg 
        backdrop-blur-md transition text-sm"
      >
        Copy
      </button>

      {/* TEXTAREA */}
      <textarea
        className="min-w-[800px] bg-gradient-to-br from-gray-900 to-gray-800 
        text-white p-5 rounded-xl 
        border border-gray-700 
        shadow-lg
        outline-none 
        resize-none
        leading-relaxed"
        value={paste.content}
        disabled
        rows={20}
      />

    </div>
  </div>
);
}

export default ViewPaste