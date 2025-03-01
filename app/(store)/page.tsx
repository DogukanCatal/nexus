import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import Image from "next/image";

const Home = async () => {
  const products = await getAllProducts();

  return (
    <div className="p-4 sm:p-8 md:p-14 mx-auto">
      <section className="">
        <ProductGrid products={products} />
      </section>
    </div>
  );
};

export default Home;
