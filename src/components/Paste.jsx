import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTitle, setSearchTitle] = useState('');
  const dispatch = useDispatch();

  // FILTER
  const filteredData = pastes.filter(
    (paste) =>
      paste.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  // DELETE
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.success("Paste deleted");
  }

  // SHARE
  async function handleShare(paste) {
    const shareUrl = `${window.location.origin}/pastes/${paste._id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: paste.title,
          text: paste.content,
          url: shareUrl,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard");
    }
  }

  return (
    <div>

      {/* SEARCH */}
      <input
        className="bg-gray-800 text-white px-3 py-2 rounded-xl mt-5
        border border-gray-600 min-w-[900px]
        shadow-md shadow-black/30
        outline-none 
        focus:border-purple-500 
        focus:shadow-purple-500/20"
        type="search"
        placeholder="Search here"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}  // ✅ FIXED
      />

      {/* LIST */}
      <div className="flex items-center flex-col gap-5 mt-5">

        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                key={paste._id}   // ✅ FIXED
                className="flex flex-col justify-center border items-center min-w-[900px] py-2"
              >

                {/* TITLE */}
                <div>{paste.title}</div>

                {/* CONTENT */}
                <div>{paste.content}</div>

                {/* BUTTONS */}
                <div className="flex justify-evenly items-center w-full mt-2">

                  {/* EDIT */}
                  <button className="bg-gray-700 text-white px-2 py-1 rounded-xl 
                    shadow-md shadow-black/30 hover:bg-purple-600 transition">
                    <a href={`/?pasteId=${paste._id}`}>Edit</a>
                  </button>

                  {/* VIEW */}
                  <button className="bg-gray-700 text-white px-2 py-1 rounded-xl 
                    shadow-md shadow-black/30 hover:bg-purple-600 transition">
                    <a href={`/pastes/${paste._id}`}>View</a>
                  </button>

                  {/* COPY */}
                  <button
                    className="bg-gray-700 text-white px-2 py-1 rounded-xl 
                    shadow-md shadow-black/30 hover:bg-purple-600 transition"
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied to Clipboard");
                    }}
                  >
                    Copy
                  </button>

                  {/* SHARE */}
                  <button
                    className="bg-gray-700 text-white px-2 py-1 rounded-xl 
                    shadow-md shadow-black/30 hover:bg-purple-600 transition"
                    onClick={() => handleShare(paste)}
                  >
                    Share
                  </button>

                  {/* DELETE */}
                  <button
                    className="bg-gray-700 text-white px-2 py-1 rounded-xl 
                    shadow-md shadow-black/30 hover:bg-purple-600 transition"
                    onClick={() => handleDelete(paste._id)}
                  >
                    Delete
                  </button>

                </div>

                {/* DATE */}
                <div>
                  {new Date(paste.createdAt).toLocaleString()}
                </div>

              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;