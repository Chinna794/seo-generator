import { Badge } from "@/components/ui/badge";
import { FormLabel } from "@/components/ui/form";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import React from "react";

export default function FormLabelWithCounter({
  count,
  max,
  children,
  tooltip,
}: {
  count: number;
  max: number;
  children: React.ReactNode;
  tooltip: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <FormLabel>{children}</FormLabel>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant={"secondary"}>
            {count}/{max}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </div>
  );
}
