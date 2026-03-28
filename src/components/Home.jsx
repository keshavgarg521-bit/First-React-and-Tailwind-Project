import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addToPastes, updateToPastes } from '../redux/pasteSlice'

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  // ✅ SAFE useEffect
  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  // ✅ CREATE / UPDATE
  function createPaste() {

    // VALIDATION
    if (!title.trim() || !value.trim()) {
      toast.error("Please Enter The Value ❌");
      return;
    }

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(32),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
      toast.success("Paste Updated ✅");
    }
    else {
      dispatch(addToPastes(paste));
      toast.success("Paste Created ✅");
    }

    // RESET
    setTitle('');
    setValue('');
    setSearchParams({});
  }

return (
  <div className="max-w-4xl mx-auto px-4 mt-8">

    {/* TITLE SECTION */}
    <div className="flex flex-col sm:flex-row gap-3 items-center">

      <input
        className="w-full sm:flex-1 bg-gray-900 text-white px-4 py-3 rounded-xl 
        border border-gray-700 
        shadow-md
        outline-none 
        focus:border-purple-500 
        focus:ring-2 focus:ring-purple-500/30
        transition"
        type="text"
        placeholder="📝 Enter title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={createPaste}
        className="bg-gradient-to-r from-indigo-500 to-purple-500 
        text-white px-5 py-3 rounded-xl 
        shadow-md hover:scale-105 transition duration-200 whitespace-nowrap"
      >
        {pasteId ? "Update" : "Create"}
      </button>

    </div>

    {/* TEXTAREA CARD */}
    <div className="relative mt-6">

      {/* COPY BUTTON */}
      <button
        onClick={() => {
          if (!value.trim()) {
            toast.error("Nothing to copy ❌");
            return;
          }
          navigator.clipboard.writeText(value);
          toast.success("Copied ✅");
        }}
        className="absolute top-4 right-4 
        bg-white/20 hover:bg-white/30 
        text-white px-3 py-1 rounded-lg 
        backdrop-blur-md transition text-sm z-10"
      >
        Copy
      </button>

      {/* TEXTAREA */}
      <textarea
        className="w-full min-h-[800px] bg-gradient-to-br from-gray-900 to-gray-800 
        text-white p-5 pt-6 rounded-2xl 
        border border-gray-700 
        shadow-xl
        outline-none 
        focus:border-purple-500 
        focus:ring-2 focus:ring-purple-500/20 
        resize-none transition"
        placeholder="✨ Start writing your note..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

    </div>

  </div>
);
}

export default Home;