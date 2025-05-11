"use server";
import { checkoutSchema } from "@/lib/checkoutSchema";
import { BasketItem } from "@/store";
import { backendClient } from "@/sanity/lib/backendClient";
const submitCheckout = async (
  _: unknown,
  formData: FormData,
  basketProducts: BasketItem[],
  totalPrice: number,
  totalQuantity: number
) => {
  const formValues = {
    name: formData.get("name") as string,
    surname: formData.get("surname") as string,
    email: formData.get("email") as string,
    address: formData.get("address") as string,
    phoneNumber: formData.get("phoneNumber") as string,
  };

  const { success, error, data } = checkoutSchema.safeParse(formValues);

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
      values: formValues,
    };
  }

  if (!Array.isArray(basketProducts)) {
    console.log("Array is empty");
    return {
      success: false,
    };
  }

  console.log("basket item", basketProducts[0]);

  await backendClient.create({
    _type: "order",
    orderNumber: crypto.randomUUID(),
    ...data,
    products: basketProducts.map((item) => ({
      _key: crypto.randomUUID(),
      _type: "orderProduct",
      product: {
        _type: "reference",
        _ref: item.product._id,
      },
      quantity: item.quantity,
    })),
    status: "pending",
    totalPrice,
    totalQuantity,
  });

  // Update product stocks transactionally
  const transaction = backendClient.transaction();

  for (const item of basketProducts) {
    const productId = item.product._id;
    const product = await backendClient.getDocument(productId);

    if (!product) {
      console.error(`Product not found: ${productId}`);
      return { success: false, error: `Product not found: ${productId}` };
    }

    if (product.stock < item.quantity) {
      console.error(`Insufficient stock for ${product.name}`);
      return {
        success: false,
        error: `Insufficient stock for ${product.name}`,
      };
    }

    transaction.patch(productId, {
      dec: { stock: item.quantity },
    });
  }

  try {
    await transaction.commit();
  } catch (err) {
    console.error("Transaction failed", err);
    return { success: false, error: "Failed to update product stocks" };
  }

  console.log(data);

  return {
    success: true,
  };
};

export default submitCheckout;
