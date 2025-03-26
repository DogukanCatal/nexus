"use client";
import React from "react";
import { Button } from "../ui/button";
import { SECRET_KEY, xorDecrypt } from "@/utils/xorCrypto";

const PlaceOrder = () => {
  const handlePlaceOrder = async () => {
    try {
      const encrypted = localStorage.getItem("nexus-store");
      if (!encrypted) throw new Error("Missing persisted store");

      let parsed: any;
      try {
        const decrypted = xorDecrypt(encrypted, SECRET_KEY);
        parsed = JSON.parse(decrypted);
      } catch (err) {
        throw new Error("Decryption or parse failed — cart may be corrupted");
      }

      if (!parsed.state?.items || !Array.isArray(parsed.state.items)) {
        throw new Error("Cart structure is invalid");
      }

      //   setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 600));
    } catch (error) {
      console.error("[Basket] Zustand failed or corrupted:", error);
      sessionStorage.setItem(
        "storeReset",
        "Something went wrong with your cart. It has been reset."
      );
      localStorage.clear();
      window.location.reload();
    } finally {
      //   setIsLoading(false);
    }
  };

  return <Button onClick={handlePlaceOrder}>PlaceOrder</Button>;
};

export default PlaceOrder;
