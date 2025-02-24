import { type SchemaTypeDefinition } from "sanity";
import { product } from "./product";
import { productCategory } from "./productCategory";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, productCategory],
};
