import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const logger = (...args: any[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log("%c[DEV]:", "background-color: yellow; color: black", args);
  }
};

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT";
    maximumFractionDigits?: number;
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const {
    currency = "USD",
    notation = "compact",
    maximumFractionDigits = 2,
  } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits,
  }).format(numericPrice);
}

// WIP: Change client ID for production
export const getStripeOAuthLink = (
  accountType: "agency" | "subaccount",
  state: string
) => {
  return `https://connect.stripe.com/oauth/v2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID_TEST}&scope=read_write&redirect_uri=${process.env.NEXT_PUBLIC_URL}${accountType}&state=${state}`;
};
