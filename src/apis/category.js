import request from "@/utils/http";

export const getCategories = (id) => {
    return request.get("/category",{
        params:{
            id
        }
    });
}