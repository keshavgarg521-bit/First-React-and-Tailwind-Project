import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);

      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      toast.success("Paste Created Successfully");
    },

    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;

      const index = state.pastes.findIndex(
        (item) => item._id === updatedPaste._id,
      );

      if (index !== -1) {
        state.pastes[index] = updatedPaste;

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste Updated Successfully");
      }
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      console.log(pasteId);
      state.pastes = state.pastes.filter((item) => item._id !== pasteId);

      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      toast.success("Paste Deleted");
    },

    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");

      toast.success("All Pastes Cleared");
    },
  },
});

export const { addToPastes, updateToPastes, removeFromPastes, resetAllPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
