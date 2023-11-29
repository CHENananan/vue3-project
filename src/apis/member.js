/*
params: {
	orderState:0,
  page:1,
  pageSize:2
}
*/

import request from "@/utils/http";

export const getUserOrder = (params) => {
  return request.get("/member/order", {
    params,
  });
};
