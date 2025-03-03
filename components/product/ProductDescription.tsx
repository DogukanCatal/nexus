import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ProductDescriptionProps = {
  description?: string;
};

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  if (!description) {
    return null;
  }
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-bold text-sm hover:no-underline border-t-2">
          Description
        </AccordionTrigger>
        <AccordionContent className="font-semibold">
          {description}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductDescription;
