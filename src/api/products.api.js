import { fakeStoreApi } from "./instance/api";

export async function getProducts (){
    const res = await fakeStoreApi.get("/products")
    return res.data;
}

export async function getSingleProduct (id){
    const res = await fakeStoreApi.get(`/products/${id}`)
    return res.data;
}

export async function addProduct (newData){
    const res = await fakeStoreApi.post("/products",newData)
    return res.data;
}

export async function updateProduct (id, newData){
    const res = await fakeStoreApi.put(`/products/${id}`,newData)
    return res.data;
}

export async function deleteProducts (id){
    const res = await fakeStoreApi.delete(`/products/${id}`)
    return res.data;
}