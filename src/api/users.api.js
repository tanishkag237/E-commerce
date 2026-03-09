import { fakeStoreApi } from "./instance/api";

export async function getAllUsers (){
    const res = await fakeStoreApi.get("/users")
    return res.data;
}

export async function getUser (id){
    const res = await fakeStoreApi.get(`/users/${id}`)
    console.log("Single user : ",res.data)
    return res.data;
}