import React from "react";

type ProductPriceProps = {
  price: number;
  sale?: number;
  priceSize?: "small" | "medium" | "large"; // Control text size dynamically
  discountSize?: "small" | "medium" | "large"; // Control text size dynamically
};

const ProductPrice = ({
  price,
  sale = 0,
  priceSize = "medium",
  discountSize = "small",
}: ProductPriceProps) => {
  const discountedPrice =
    sale > 0 ? (price - (price * sale) / 100).toFixed(2) : price.toFixed(2);

  const sizeClasses = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-lg",
  };

  return (
    <>
      {sale > 0 ? (
        <div className="flex">
          <span className={`font-semibold ${sizeClasses[priceSize]}`}>
            {discountedPrice} TL
          </span>
          <span
            className={`font-semibold ${sizeClasses[discountSize]} ml-2 text-center items-center justify-center flex line-through text-gray-500`}
          >
            {price.toFixed(2)} TL
          </span>
        </div>
      ) : (
        <span className={`font-semibold ${sizeClasses[priceSize]} `}>
          {price.toFixed(2)} TL
        </span>
      )}
    </>
  );
};

export default ProductPrice;

// todo take reference from this for styling or remove it at the end
// import React from "react";

// type ProductPriceProps = {
//   price: number;
//   sale?: number;
//   size?: "small" | "medium" | "large"; // Control text size dynamically
// };

// const ProductPrice = ({ price, sale = 0, size = "medium" }: ProductPriceProps) => {
//   const discountedPrice = sale > 0 ? (price - (price * sale) / 100).toFixed(2) : price.toFixed(2);

//   const sizeClasses = {
//     small: "text-xs",
//     medium: "text-sm",
//     large: "text-lg",
//   };

//   return (
//     <div className="flex items-center">
//       {sale > 0 ? (
//         <>
//           <span className={`font-semibold text-slate-300 ${sizeClasses[size]}`}>
//             {discountedPrice} TL
//           </span>
//           <span
//             className={`font-semibold ml-2 text-gray-500 line-through ${sizeClasses[size]}`}
//           >
//             {price.toFixed(2)} TL
//           </span>
//         </>
//       ) : (
//         <span className={`font-semibold text-slate-300 ${sizeClasses[size]}`}>
//           {price.toFixed(2)} TL
//         </span>
//       )}
//     </div>
//   );
// };

// export default ProductPrice;
