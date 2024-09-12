import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messageList: [],
  error: null,
  success: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    newMessage: (state, action) => {
        state.messageList.push(action.payload);
    },
    sendMessageSuccess: (state) => {
      state.success = true;
    },
    sendMessageFailed: (state, action) => {
      state.error = action.payload;
    },
    resetMessageList:(state)=>{
      state.messageList=[];
    }
  },
});

export default messageSlice.reducer;
export const { newMessage, sendMessageFailed, sendMessageSuccess,resetMessageList } =
  messageSlice.actions;
