import request from "@/utils/http";

export const getCategories = (id) => {
    return request.get("/category",{
        params:{
            id
        }
    });
}

export const getFilterCategories = (id) => {
    return request.get("/category/sub/filter",{
        params:{
            id
        }
    });
}

export const getSubCategories = (params) => {
    return request.post("/category/goods/temporary",{
        ...params
    });
}