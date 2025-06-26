import { type RouteConfig, index, route } from "@react-router/dev/routes";

const simpleRoutes = [
  { path: "code", file: "routes/(MasterData)/code.tsx" },
  { path: "model", file: "routes/(MasterData)/model.tsx" },
  { path: "size", file: "routes/(MasterData)/size.tsx" },
  { path: "color", file: "routes/(MasterData)/color.tsx" },
  { path: "item", file: "routes/(MasterData)/item.tsx" },
  { path: "supplier", file: "routes/supplier.tsx" },
  { path: "purchase-list", file: "routes/(Procurement)/purchaseList.tsx" },
  {
    path: "purchase-list-detail/:purchaseListId",
    file: "routes/purchaseListDetail.tsx",
  },
  {
    path: "good-receiver",
    file: "routes/(Procurement)/good-receiver.tsx",
  },
  {
    path: "material-inventory",
    file: "routes/inventory/materialInventory.tsx",
  },
  {
    path: "staging-cutting-inventory",
    file: "routes/inventory/stagingCuttingInventory.tsx",
  },
  {
    path: "outgoing-raw-history",
    file: "routes/inventory/outgoingRawHistory.tsx",
  },
  { path: "customer", file: "routes/customerList.tsx" },
  { path: "cutting-staff", file: "routes/(Cutters)/cuttingStaff.tsx" },
  { path: "cutting-progress", file: "routes/(Cutters)/cuttingProgress.tsx" },
  { path: "cutters-inventory", file: "routes/(Cutters)/cuttersInventory.tsx" },
  { path: "tailoring-staff", file: "routes/(Tailors)/tailoringStaff.tsx" },
  {
    path: "tailoring-progress",
    file: "routes/(Tailors)/tailoringProgress.tsx",
  },
  {
    path: "tailors-inventory",
    file: "routes/(Tailors)/tailorsInventory.tsx",
  },
  { path: "login", file: "routes/(Auth)/login.tsx" },
  { path: "category", file: "routes/(MasterData)/category.tsx" },
  {
    path: "cutting-inventory",
    file: "routes/(CuttingInventory)/cuttingInventory.tsx",
  },
  {
    path: "staging-tailor-inventory",
    file: "routes/(CuttingInventory)/stagingTailorInventory.tsx",
  },
  {
    path: "outgoing-cutting-history",
    file: "routes/(CuttingInventory)/outgoingCuttingHistory.tsx",
  },
  {
    path: "tailoring-inventory",
    file: "routes/(TailoringInventory)/tailoringInventory.tsx",
  },
  {
    path: "outgoing-tailoring-history",
    file: "routes/(TailoringInventory)/outgoingTailoringHistory.tsx",
  },
];

export default [
  index("routes/home.tsx"),
  ...simpleRoutes.map(({ path, file }) => route(path, file)),
] satisfies RouteConfig;
