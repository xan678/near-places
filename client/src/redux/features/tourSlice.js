import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";


export const createTour = createAsyncThunk("tour/createTour", async({updatedTourData, navigate, toast}, {rejectWithValue}) => {
    try{
        const response = await api.createTour(updatedTourData);
        toast.success("Tour Added Successfully");
        navigate("/");
        console.log(response);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const getTours = createAsyncThunk("tour/getTours", async(_,{rejectWithValue}) => {
    try{
        const response = await api.getTours();
        console.log(response);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const getTour = createAsyncThunk("tour/getTour", async(id,{rejectWithValue}) => {
    try{
        const response = await api.getTour(id);
        console.log(response);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});


export const getToursByUsers = createAsyncThunk("tour/getToursByUser", async(userId,{rejectWithValue}) => {
    try{
        const response = await api.getToursByUsers(userId);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const deleteTour = createAsyncThunk("tour/deleteTour", async({id,toast},{rejectWithValue}) => {
    try{
        const response = await api.deleteTour(id);
        toast.success("Tour deleted successfully")
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const updateTour = createAsyncThunk("tour/updateTour", async({id,updatedTourData,toast, navigate},{rejectWithValue}) => {
    try{
        const response = await api.updateTour(updatedTourData,id);
        toast.success("Tour updated successfully");
        navigate("/");
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

const tourSlice = createSlice({
    name: "tour",
    initialState: {
        tour:{},
        tours: [],
        userTour:[],
        error: "",
        loading: false
    },
    extraReducers: {
        [createTour.pending]: (state, action) => {
            state.loading = true;
        },
        [createTour.fulfilled]: (state, action) => {
            state.loading = false;
            state.tours = [action.payload];
        },
        [createTour.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getTours.pending]: (state, action) => {
            state.loading = true;
        },
        [getTours.fulfilled]: (state, action) => {
            state.loading = false;
            state.tours = action.payload;
        },
        [getTours.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getTour.pending]: (state, action) => {
            state.loading = true;
        },
        [getTour.fulfilled]: (state, action) => {
            state.loading = false;
            state.tour = action.payload;
        },
        [getTour.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getToursByUsers.pending]: (state, action) => {
            state.loading = true;
        },
        [getToursByUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.userTour = action.payload;
        },
        [getToursByUsers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [deleteTour.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteTour.fulfilled]: (state, action) => {
            state.loading = false;
            const {arg : {id}} = action.meta;
            if(id) {
                state.userTour = state.userTour.filter((item) => item._id !== id);
                state.tours = state.tours.filter((item) => item._id !== id);
            }
        },
        [deleteTour.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },       
        
        [updateTour.pending]: (state, action) => {
            state.loading = true;
        },
        [updateTour.fulfilled]: (state, action) => {
            state.loading = false;
            const {arg : {id}} = action.meta;
            if(id) {
                state.userTour = state.userTour.map((item) => item._id === id ? action.payload : item);
                state.tours = state.tours.map((item) => item._id === id? action.payload : item);
            }
        },
        [updateTour.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        
    }
});

export default tourSlice.reducer;


