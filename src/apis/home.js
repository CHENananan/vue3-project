import httpInstance from "@/utils/http";

export const getCategory = () => {
    return httpInstance.get("/home/category/head");
}

export const getBanner = () => {
    return httpInstance.get("/home/banner");
}