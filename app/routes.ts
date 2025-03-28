import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("code", "routes/code.tsx"),
  route("model", "routes/model.tsx"),
  route("size", "routes/size.tsx"),
] satisfies RouteConfig;
