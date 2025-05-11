"use client";
import React, { useEffect, useRef } from "react";
import { checkoutSchema, CheckoutFormData } from "@/lib/checkoutSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import submitCheckout from "./actions/submitCheckout";
import { getSecureCart } from "@/utils/getSecureCart";
import { useBasketStore } from "@/store";
import { useShallow } from "zustand/shallow";
import { useRouter } from "next/navigation";
import validateBasketProducts from "./actions/validateBasketProducts";

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
  const { items, totalItemsCount, totalPrice, bulkUpdateItems, _hasHydrated } =
    useBasketStore(
      useShallow((state) => ({
        items: state.items,
        totalItemsCount: state.totalItemsCount,
        totalPrice: state.totalPrice,
        removeItem: state.removeItem,
        addItem: state.addItem,
        bulkUpdateItems: state.bulkUpdateItems,
        _hasHydrated: state._hasHydrated,
      }))
    );

  const router = useRouter();
  const hasValidatedRef = useRef(false);

  useEffect(() => {
    const validateProducts = async () => {
      try {
        const products = await validateBasketProducts(items);
        bulkUpdateItems(products);
        console.log(items);
      } catch (error) {
        console.log("Failed to validate basket products.", error);
      }
    };
    if (_hasHydrated && items.length === 0) {
      router.replace("/");
    } else if (_hasHydrated && items.length > 0 && !hasValidatedRef.current) {
      hasValidatedRef.current = true;
      validateProducts();
    }
  }, [_hasHydrated, items, bulkUpdateItems, router]);

  const onSubmit = async (data: CheckoutFormData) => {
    const cart = getSecureCart();
    if (cart.length == 0) {
      console.log("cart is corrupted");

      localStorage.clear();
      window.location.reload();
    }
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    const result = await submitCheckout(
      null,
      formData,
      items,
      totalPrice,
      totalItemsCount
    );
    if (result && result.success) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="mx-auto container p-6 sm:p-8 md:p-14">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
        className="w-full max-w-xl"
      >
        <div className="flex flex-col space-y-6 w-full justify-start">
          <fieldset>
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              {...register("name")}
              placeholder="name"
              className={` ${errors.name ? "border-red-500" : ""}`}
            />
            {errors?.name && (
              <p className="text-sm text-red-500">{errors?.name.message}</p>
            )}
          </fieldset>

          <fieldset>
            <label htmlFor="surname">Surname</label>
            <Input type="text" {...register("surname")} placeholder="surname" />
            {errors?.surname && (
              <p className="text-sm text-red-500">{errors.surname?.message}</p>
            )}
          </fieldset>

          <fieldset>
            <label htmlFor="email">Email</label>
            <Input type="text" {...register("email")} placeholder="email" />
            {errors?.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </fieldset>

          <fieldset>
            <label htmlFor="address">Address</label>
            <Input type="text" {...register("address")} placeholder="address" />
            {errors?.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </fieldset>

          <fieldset>
            <label htmlFor="phoneNumber">Phone Number</label>
            <Input
              type="text"
              {...register("phoneNumber")}
              placeholder="phone number"
            />
            {errors?.phoneNumber && (
              <p className="text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </fieldset>

          <p className="font-bold text-sm">
            *Only payment option is at the door
          </p>

          <div className="flex justify-center">
            <Button className="w-full mx-10" type="submit">
              Place Order
            </Button>
          </div>
        </div>
      </form>
      {/* <BasketProductView></BasketProductView> */}
      {/* <PlaceOrder /> */}
    </div>
  );
};

export default CheckoutPage;
