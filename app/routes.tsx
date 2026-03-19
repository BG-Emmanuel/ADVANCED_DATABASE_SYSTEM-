import { createBrowserRouter } from "react-router";
import { Landing } from "./components/Landing";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { Shipments } from "./components/Shipments";
import { Orders } from "./components/Orders";
import { Inventory } from "./components/Inventory";
import { Customers } from "./components/Customers";
import { Products } from "./components/Products";
import { Warehouses } from "./components/Warehouses";
import { AIRiskMonitor } from "./components/AIRiskMonitor";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/dashboard",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "shipments", Component: Shipments },
      { path: "orders", Component: Orders },
      { path: "inventory", Component: Inventory },
      { path: "customers", Component: Customers },
      { path: "products", Component: Products },
      { path: "warehouses", Component: Warehouses },
      { path: "ai-risk", Component: AIRiskMonitor },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);