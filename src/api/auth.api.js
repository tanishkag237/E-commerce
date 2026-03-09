import { fakeStoreApi } from "./instance/api";

export async function loginUser ({username, password}){
    const res = await fakeStoreApi.post("/auth/login", {username, password});
    console.log("LOGIN token : ",res.data.token )
    return res.data.token;
}

