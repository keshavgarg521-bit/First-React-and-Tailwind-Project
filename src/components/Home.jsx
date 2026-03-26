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
    } else {
      dispatch(addToPastes(paste));
      toast.success("Paste Created ✅");
    }

    // RESET
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className="w-full flex flex-col items-center mt-7">

      {/* INPUT + BUTTON */}
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

      {/* TEXTAREA WITH COPY BUTTON */}
      <div className="relative mt-5">

        {/* COPY BUTTON */}
        <button
          onClick={() => {
            if (!value.trim()) {
              toast.error("Nothing to copy ❌");
              return;
            }
            navigator.clipboard.writeText(value);
            toast.success("Copied to Clipboard ✅");
          }}
          className="absolute top-3 right-3 bg-gray-700 text-white px-3 py-1 rounded-lg 
          shadow-md hover:bg-purple-600 transition text-sm z-10"
        >
          Copy
        </button>

        {/* TEXTAREA */}
        <textarea
          className="min-w-[800px] bg-gray-800 text-white 
          p-4 pt-3 rounded-xl border border-gray-600 
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

export default Home;