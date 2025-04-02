import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("code", "routes/code.tsx"),
  route("model", "routes/model.tsx"),
  route("size", "routes/size.tsx"),
  route("supplier", "routes/supplier.tsx"),
  route("purchase-list", "routes/purchaseList.tsx"),
  route(
    "purchase-list-detail/:purchaseListId",
    "routes/purchaseListDetail.tsx"
  ),
  route("purchase-list/add", "routes/purchaseListAddNew.tsx"),
] satisfies RouteConfig;
