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
    <div className="max-w-4xl mx-auto px-4">

      {/* SEARCH */}
      <input
        className="w-full bg-gradient-to-r from-gray-900 to-gray-800 
        text-white px-4 py-3 rounded-xl mt-6
        border border-gray-700 
        shadow-md
        outline-none 
        focus:ring-2 focus:ring-purple-500/30
        transition"
        type="search"
        placeholder="🔍 Search your notes..."
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      />

      {/* LIST */}
      <div className="flex flex-col gap-6 mt-8">

        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                key={paste._id}
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-slate-800
                border border-gray-700 
                text-white p-5 rounded-xl shadow-lg 
                hover:shadow-xl hover:scale-[1.01] 
                transition duration-300"
              >

                {/* TITLE */}
                <div className="text-lg font-semibold text-gray-100">
                  {paste.title}
                </div>

                {/* CONTENT */}
                <div className="text-sm text-gray-300 mt-1 break-words">
                  {paste.content}
                </div>

                {/* BUTTONS */}
                <div className="flex flex-wrap gap-2 mt-4">

                  <a
                    href={`/?pasteId=${paste._id}`}
                    className="bg-white/10 hover:bg-white/20 
                    px-3 py-1 rounded-lg text-sm 
                    backdrop-blur-md transition"
                  >
                    Edit
                  </a>

                  <a
                    href={`/pastes/${paste._id}`}
                    className="bg-white/10 hover:bg-white/20 
                    px-3 py-1 rounded-lg text-sm 
                    backdrop-blur-md transition"
                  >
                    View
                  </a>

                  <button
                    className="bg-white/10 hover:bg-white/20 
                    px-3 py-1 rounded-lg text-sm 
                    backdrop-blur-md transition"
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied to Clipboard");
                    }}
                  >
                    Copy
                  </button>

                  <button
                    className="bg-white/10 hover:bg-white/20 
                    px-3 py-1 rounded-lg text-sm 
                    backdrop-blur-md transition"
                    onClick={() => handleShare(paste)}
                  >
                    Share
                  </button>

                  <button
                    className="bg-red-500/80 hover:bg-red-600 
                    px-3 py-1 rounded-lg text-sm transition"
                    onClick={() => handleDelete(paste._id)}
                  >
                    Delete
                  </button>

                </div>

                {/* DATE */}
                <div className="text-xs text-gray-400 mt-3">
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