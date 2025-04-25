import { type RouteConfig, index, route } from "@react-router/dev/routes";

const simpleRoutes = [
  { path: "code", file: "routes/(MasterData)/code.tsx" },
  { path: "model", file: "routes/(MasterData)/model.tsx" },
  { path: "size", file: "routes/(MasterData)/size.tsx" },
  { path: "color", file: "routes/(MasterData)/color.tsx" },
  { path: "item", file: "routes/(MasterData)/item.tsx" },
  { path: "supplier", file: "routes/supplier.tsx" },
  { path: "purchase-list", file: "routes/purchaseList.tsx" },
  {
    path: "purchase-list-detail/:purchaseListId",
    file: "routes/purchaseListDetail.tsx",
  },
  {
    path: "material-inventory",
    file: "routes/inventory/materialInventory.tsx",
  },
  {
    path: "staging-cutting-inventory",
    file: "routes/inventory/stagingCuttingInventory.tsx",
  },
  { path: "customer", file: "routes/customerList.tsx" },
  { path: "cutting-staff", file: "routes/(Cutters)/cuttingStaff.tsx" },
  { path: "cutting-progress", file: "routes/(Cutters)/cuttingProgress.tsx" },
  { path: "tailor-staff", file: "routes/(Tailors)/tailorStaff.tsx" },
  { path: "tailor-progress", file: "routes/(Tailors)/tailorProgress.tsx" },
  { path: "login", file: "routes/(Auth)/login.tsx" },
  { path: "register", file: "routes/(Auth)/register.tsx" },
];

export default [
  index("routes/home.tsx"),
  ...simpleRoutes.map(({ path, file }) => route(path, file)),
] satisfies RouteConfig;
