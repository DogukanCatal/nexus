"use server";
import { checkoutSchema } from "@/lib/checkoutSchema";

const submitCheckout = async (_: unknown, formData: FormData) => {
  console.log("submit checkout triggered");
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

  console.log(data);

  return {
    success: true,
  };
};

export default submitCheckout;
