"use client";

import { RiStarFill } from "@remixicon/react";
import { useId, useState } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Rating() {
  const id = useId();
  const [hoverRating, setHoverRating] = useState("");
  const [currentRating, setCurrentRating] = useState("");
  const [isRated, setIsRated] = useState(false);
  const [cachedRating, setCachedRating] = useState(localStorage?.getItem("rating") || "");

  const onRateChange = (value: string) => {
    setCurrentRating(value);
    setIsRated(true);
    setTimeout(() => {
      localStorage.setItem("rating", value);
      setCachedRating(value);
    }, 900);
  };

  if (cachedRating) return null;

  if (isRated)
    return (
      <div className="mt-10">
        <Label className="mb-2">
          <RiStarFill size={18} className={`text-amber-500 transition-all group-hover:scale-110`} />
          Thank you for sharing your feedback!
        </Label>
      </div>
    );

  return (
    <fieldset className="mt-10 space-y-4">
      <Label asChild htmlFor={id}>
        <legend>Rate your experience</legend>
      </Label>
      <RadioGroup
        className="inline-flex gap-0"
        onValueChange={onRateChange}
        value={currentRating}
        name="rating"
        id={id}
      >
        {["1", "2", "3", "4", "5"].map((value) => (
          <label
            key={value}
            className="has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-focus-visible:ring-[3px] group relative cursor-pointer rounded p-0.5 outline-none"
            onMouseEnter={() => setHoverRating(value)}
            onMouseLeave={() => setHoverRating("")}
          >
            <RadioGroupItem id={`${id}-${value}`} value={value} className="sr-only" />
            <RiStarFill
              size={24}
              className={`transition-all ${
                (hoverRating || currentRating) >= value ? "text-amber-500" : "text-input"
              } group-hover:scale-110`}
            />
            <span className="sr-only">
              {value} star{value === "1" ? "" : "s"}
            </span>
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
