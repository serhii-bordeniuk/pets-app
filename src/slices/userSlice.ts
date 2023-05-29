import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    email?: string | null;
}

const initialState: UserState = {
    email: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.email = action.payload.email;
        },
        clearUser: (state) => {
            state.email = "";
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
