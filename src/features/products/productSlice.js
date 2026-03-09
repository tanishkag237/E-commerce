import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProduct, deleteProducts, getProducts, updateProduct } from "../../api/products.api";

export const fetchProductsThunk = createAsyncThunk(
    "products/fetchProducts",
    async (_,{ rejectWithValue }) =>{
        try{
            const response = await getProducts()
            console.log("Product slice res: ", response.data)
        return response;
        } catch (error){
            return rejectWithValue(error)
        }
    }
)

export const addProductsThunk = createAsyncThunk(
    "products/addProducts",
    async(newData,{rejectWithValue}) =>{
        try{
            const res = await addProduct(newData);
            return res;
        }
        catch(err){
            return rejectWithValue(err.message ||"Failed to add product")
        }
    }
)

export const updateProductsThunk = createAsyncThunk(
    "products/updateProducts",
    async({id,newData},{rejectWithValue}) =>{
        try{
            const res = await updateProduct(id,newData);
            return res;
        }
        catch(err){
            return rejectWithValue(err.message||"Failed to update product")
        }
    }
)

export const deleteProductsThunk = createAsyncThunk(
    "products/deleteProducts",
    async(id,{rejectWithValue}) =>{
        try{
            await deleteProducts(id);
            return id;
        }
        catch(err){
            return rejectWithValue(err.message||"Failed to delete product")
        }
    }
)

const initialState ={
    data:[],
    error:null,
    isLoading:false
}

const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        // fetching products
        .addCase(fetchProductsThunk.pending, (state)=>{
            state.error=null;
            state.isLoading=true;
        })
        .addCase(fetchProductsThunk.fulfilled, (state,action)=>{
            state.error=null;
            state.isLoading=false;
            state.data=action.payload
        })
        .addCase(fetchProductsThunk.rejected, (state,action)=>{
            state.error=action.payload;
            state.isLoading=false;
        })

        // adding products
        .addCase(addProductsThunk.pending, (state)=>{
            state.error=null;
            state.isLoading=true;
        })

        .addCase(addProductsThunk.fulfilled, (state,action)=>{
            state.isLoading=false;
            state.data.push(action.payload)
        })

        .addCase(addProductsThunk.rejected, (state,action)=>{
            state.error=action.payload;
            state.isLoading=false;
        })

        // updating products
        .addCase(updateProductsThunk.pending, (state)=>{
            state.error=null;
            state.isLoading=true;
        })

        .addCase(updateProductsThunk.fulfilled, (state,action)=>{
            const index = state.data.findIndex((p) => p.id === action.payload.id);
            if(index!==-1){
                state.data[index]=action.payload
            }
            state.isLoading=false;
        })

        .addCase(updateProductsThunk.rejected, (state,action)=>{
            state.error=action.payload;
            state.isLoading=false;
        })

        // deleting products
        .addCase(deleteProductsThunk.pending, (state)=>{
            state.error=null;
            state.isLoading=true;
        })

        .addCase(deleteProductsThunk.fulfilled, (state,action)=>{
            state.isLoading=false;
            state.data = state.data.filter((p)=>p.id !== action.payload)
        })

        .addCase(deleteProductsThunk.rejected, (state,action)=>{
            state.error=action.payload;
            state.isLoading=false;
        })

    }
})

export default productSlice.reducer