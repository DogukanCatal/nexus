import { type SchemaTypeDefinition } from "sanity";
import { product } from "./product";
import { productCategory } from "./productCategory";
import { order } from "./order";
import { orderProduct } from "./orderProduct";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, productCategory, order, orderProduct],
};
