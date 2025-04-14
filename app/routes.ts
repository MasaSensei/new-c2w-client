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
  route("material-inventory", "routes/inventory/materialInventory.tsx"),
  route(
    "staging-cutting-inventory",
    "routes/inventory/stagingCuttingInventory.tsx"
  ),
  route("customer", "routes/customerList.tsx"),
  route("cutting-staff", "routes/(Cutters)/cuttingStaff.tsx"),
  route("tailor-staff", "routes/(Tailors)/tailorStaff.tsx"),
] satisfies RouteConfig;
