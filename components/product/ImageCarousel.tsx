"use client";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { EmblaOptionsType } from "embla-carousel";

type ImageCarouselProps = {
  product: Product;
  options?: EmblaOptionsType;
};

const ImageCarousel = ({ product }: ImageCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  // const [mainViewRef, mainEmbla] = useEmblaCarousel({ loop: true });
  // const [thumbViewRef, thumbEmbla] = useEmblaCarousel({
  //   containScroll: "keepSnaps",
  //   dragFree: true,
  // });
  // if (!product.image) {
  //   return null;
  // }

  // const onSelect = useCallback(() => {
  //   if (!mainEmbla || !thumbEmbla) return;
  //   setSelectedIndex(mainEmbla.selectedScrollSnap());
  //   thumbEmbla.scrollTo(mainEmbla.selectedScrollSnap());
  // }, [mainEmbla, thumbEmbla]);

  // useEffect(() => {
  //   if (!mainEmbla) return;
  //   onSelect();
  //   mainEmbla.on("select", onSelect);
  //   return () => {
  //     mainEmbla.off("select", onSelect);
  //   };
  // }, [mainEmbla, onSelect]);

  const HandleRightClick = () => {
    if (product.image && selectedIndex < product.image.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else {
      setSelectedIndex(0);
    }
  };

  const HandleLeftClick = () => {
    if (product.image) {
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      } else {
        setSelectedIndex(product.image.length - 1);
      }
    }
  };

  return (
    // <div className="flex flex-col  justify-start items-center w-full  gap-2 ">
    //   {/* Main Carousel */}
    //   <div
    //     className="relative overflow-hidden mx-auto w-full  rounded-xl"
    //     ref={mainViewRef}
    //   >
    //     <div className="flex">
    //       {product.image.map((img, index) => (
    //         <div className="relative flex-[0_0_100%]" key={index}>
    //           <Card className="overflow-hidden border-0 rounded-none ">
    //             <CardContent className="flex relative aspect-square items-center justify-center">
    //               <Image
    //                 fill
    //                 priority
    //                 alt={product.name || "Product Name"}
    //                 src={urlFor(img).url()}
    //                 className="object-cover"
    //               />
    //             </CardContent>
    //           </Card>
    //         </div>
    //       ))}
    //     </div>
    //     <Button
    //       variant="outline"
    //       size="icon"
    //       className="absolute left-2 top-1/2 -translate-y-1/2"
    //       onClick={() => mainEmbla?.scrollPrev()}
    //     >
    //       <ChevronLeft className="h-4 w-4" />
    //     </Button>
    //     <Button
    //       variant="outline"
    //       size="icon"
    //       className="absolute right-2 top-1/2 -translate-y-1/2"
    //       onClick={() => mainEmbla?.scrollNext()}
    //     >
    //       <ChevronRight className="h-4 w-4" />
    //     </Button>
    //   </div>

    //   {/* Thumbnails */}
    //   <div
    //     className="overflow-x-auto sm:overflow-y-auto flex items-center justify-center "
    //     ref={thumbViewRef}
    //   >
    //     <div className="flex items-center justify-center gap-2">
    //       {product.image.map((img, index) => (
    //         <button
    //           key={index}
    //           onClick={() => onThumbClick(index)}
    //           className={`relative flex-[0_0_auto] transition-all ${
    //             selectedIndex === index
    //               ? "opacity-100"
    //               : "opacity-70 hover:opacity-100"
    //           }`}
    //         >
    //           <Card
    //             className={`border-2 overflow-hidden ${selectedIndex === index ? "border-primary" : "border-transparent"}`}
    //           >
    //             <CardContent className="flex relative aspect-square items-center justify-center  p-2 h-12 w-12">
    //               <Image
    //                 fill
    //                 priority
    //                 alt={product.name || "Product Name"}
    //                 src={urlFor(img).url()}
    //                 className="object-cover"
    //               />{" "}
    //             </CardContent>
    //           </Card>
    //         </button>
    //       ))}
    //     </div>
    //   </div>
    // </div>

    // CUSTOM IMAGE CAROUSEL
    <div className="flex-col">
      {product.image && (
        <div className="p-2">
          {/* <div className=" relative h-[400px] sm:h-[600px] w-full rounded-2xl overflow-hidden mb-4"> */}
          <div className=" relative aspect-square w-full rounded-2xl overflow-hidden">
            <Image
              fill
              priority
              alt={product.name || "Product Name"}
              src={urlFor(product.image[selectedIndex]).url()}
              className="object-cover"
            />
            {/* <div className="bg-blue-600/50 absolute left-1/2 h-full w-1/2 "></div>
            <div className="bg-red-600/50 absolute right-1/2 h-full w-1/2 "></div> */}
            <Button
              onClick={HandleLeftClick}
              className="absolute ml-4 top-1/2 cursor-pointer"
            >
              <ChevronLeftCircle />
            </Button>
            <Button
              onClick={HandleRightClick}
              className="absolute mr-4 right-0 top-1/2 cursor-pointer"
            >
              <ChevronRightCircle />
            </Button>
          </div>
        </div>
      )}
      {product.image && product.image.length > 1 && (
        <div className="flex gap-2 items-center overflow-x-auto justify-center">
          {product.image.map((img, i) => (
            <div
              key={img._key}
              onClick={() => setSelectedIndex(i)}
              className={`cursor-pointer overflow-hidden ${i === selectedIndex ? "border-2 border-white" : "border-2 border-transparent"} rounded-xl relative aspect-square `}
            >
              <Image
                priority
                alt={product.name || "Product Name"}
                src={urlFor(img).url()}
                width={50}
                height={50}
                className="object-cover size-50"
              />
            </div>
          ))}
        </div>
      )}
    </div>

    // SHADCN CAROUSEL
    // <div className="w-full max-w-lg mx-auto">
    //   {/* 🚀 Main Carousel Section */}
    //   <div className="relative">
    //     <Carousel className="w-full">
    //       <CarouselContent
    //         className="transition-transform duration-500 ease-out"
    //         style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
    //       >
    //         {" "}
    //         {product.image.map((img, i) => (
    //           <CarouselItem key={i} className="relative aspect-square w-full">
    //             <Image
    //               fill
    //               priority
    //               alt={product.name || "Product Image"}
    //               src={urlFor(img).url()}
    //               className="object-cover"
    //             />
    //           </CarouselItem>
    //         ))}
    //       </CarouselContent>

    //       {/* 🚀 Navigation Buttons (Inside Image) */}
    //       <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-2 rounded-full backdrop-blur-md hover:bg-white/50 transition" />
    //       <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-2 rounded-full backdrop-blur-md hover:bg-white/50 transition" />
    //     </Carousel>
    //   </div>

    //   {/* 🚀 Thumbnail Navigation */}
    //   {product.image.length > 1 && (
    //     <div className="flex gap-2 mt-4 items-center justify-center">
    //       {product.image.map((img, i) => (
    //         <button
    //           key={i}
    //           onClick={() => setSelectedIndex(i)}
    //           className={cn(
    //             "border-2 rounded-lg overflow-hidden transition-transform",
    //             selectedIndex === i
    //               ? "border-white scale-110"
    //               : "border-transparent"
    //           )}
    //         >
    //           <Image
    //             alt={product.name || "Thumbnail"}
    //             src={urlFor(img).url()}
    //             width={50}
    //             height={50}
    //             className="object-cover size-50"
    //           />
    //         </button>
    //       ))}
    //     </div>
    //   )}
    // </div>
  );
};

export default ImageCarousel;
