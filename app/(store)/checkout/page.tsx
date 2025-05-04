"use client";
import PlaceOrder from "@/components/checkout/PlaceOrder";
import React from "react";
import { checkoutSchema, CheckoutFormData } from "@/lib/checkoutSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import submitCheckout from "./actions/submitCheckout";
import { getSecureCart } from "@/utils/getSecureCart";

const CheckoutPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      address: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    const cart = getSecureCart();
    if (cart.length == 0) {
      console.log("cart is corrupted");

      localStorage.clear();
      window.location.reload();
    }
    console.log(cart);
    console.log(data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    const result = await submitCheckout(null, formData);
  };

  return (
    <div className="mx-auto container flex flex-col gap-6 justify-start items-center p-4 sm:p-8 md:p-14">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
        <fieldset>
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            {...register("name")}
            placeholder="name"
            className={errors.name ? "border-red-500" : ""}
            required
          />
          {errors?.name && (
            <p className="text-sm text-red-500">{errors?.name.message}</p>
          )}
        </fieldset>

        <fieldset>
          <label htmlFor="surname">Surname</label>
          <Input
            type="text"
            {...register("surname")}
            placeholder="surname"
            required
          />
          {errors?.surname && (
            <p className="text-sm text-red-500">{errors.surname?.message}</p>
          )}
        </fieldset>

        <fieldset>
          <label htmlFor="email">Email</label>
          <Input
            type="text"
            {...register("email")}
            placeholder="email"
            required
          />
          {errors?.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </fieldset>

        <fieldset>
          <label htmlFor="address">Address</label>
          <Input
            type="text"
            {...register("address")}
            placeholder="address"
            required
          />
          {errors?.address && (
            <p className="text-sm text-red-500">{errors.address.message}</p>
          )}
        </fieldset>

        <fieldset>
          <label htmlFor="phoneNumber">Phone Number</label>
          <Input
            type="text"
            {...register("phoneNumber")}
            placeholder="phoneNumber"
            required
          />
          {errors?.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
          )}
        </fieldset>

        <Button type="submit">Place Order Form</Button>
      </form>
      {/* <PlaceOrder /> */}
    </div>
  );
};

export default CheckoutPage;
