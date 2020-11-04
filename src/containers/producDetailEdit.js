import React from "react";
import { ProductDetailsContainer } from "./producDetails";
import * as ROUTES from "../constants/routes";

export function ProductDetailsContainer() {
  return <ProductDetailsContainer edit={{ pathGet: "", pathPatch: "" }} />;
}
