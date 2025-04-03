import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("code", "routes/(MasterData)/code.tsx"),
  route("model", "routes/(MasterData)/model.tsx"),
  route("size", "routes/(MasterData)/size.tsx"),
  route("color", "routes/(MasterData)/color.tsx"),
  route("item", "routes/(MasterData)/item.tsx"),
  route("supplier", "routes/supplier.tsx"),
  route("purchase-list", "routes/purchaseList.tsx"),
  route(
    "purchase-list-detail/:purchaseListId",
    "routes/purchaseListDetail.tsx"
  ),
  route("purchase-list/add", "routes/purchaseListAddNew.tsx"),
  route("material-inventory", "routes/inventory/materialInventory.tsx"),
] satisfies RouteConfig;
