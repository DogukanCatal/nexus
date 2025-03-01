import { getProductById } from "@/sanity/lib/products/getProductById";
import React from "react";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await getProductById(id);
  return <div>{JSON.stringify(product)}</div>;
};

export default ProductPage;
