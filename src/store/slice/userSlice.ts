import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { getCurrentUserFetch, userType } from "@/api/user";
import { deleteToken, hasToken, setToken } from "../localStorage";
// import { TicketFetchResponseType, getTickets } from '@/api/aviasales';
type initalStateType = {
  user?: userType;
  isLoading: boolean;
  isError: boolean;
  message: string;
};
const initialState: initalStateType = {
  isLoading: hasToken(),
  isError: false,
  user: undefined,
  message: "",
};
export const currentuser = createAsyncThunk("user/getCurrent", async () => {
  const data = await getCurrentUserFetch();
  if (data.errors) throw data.errors;
  return data;
});
export const ticketSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<userType>) => {
      const user = action.payload;
      const { token } = user;
      setToken(token);
      state.user = user;
    },
    logout: (state) => {
      state.user = undefined;
      deleteToken();
      return state;
    },
    updateUser: (state, action: PayloadAction<Exclude<userType, "token">>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(currentuser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(currentuser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(currentuser.rejected, (state) => {
      state.isError = true;
    });
  },
});
export const { login, logout, updateUser } = ticketSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default ticketSlice.reducer;
