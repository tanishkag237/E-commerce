import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../../api/users.api";
import { loginUser } from "../../api/auth.api";

export const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  error: null,
  isLoading: "idle",
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      //console.log(" sending to API:", credentials);
      const token = await loginUser(credentials);

      //console.log(" token:", token);
      const role = credentials.username === "mor_2314" ? "admin" : "user";
      const users = await getAllUsers();
      console.log("All user : ", users);

      const matchedUser = users.find(
        (u) => u.username === credentials.username,
      );
      if (!matchedUser) {
        throw new Error("User not found");
      }
      //console.log("All user : ", matchedUser);

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(matchedUser));

      return { user: matchedUser, role, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");

      state.user = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.error = null;
        state.isLoading = "loading";
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isLoading = "idle";
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = "idle";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
