import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  extend: {
    fontFamily: {
      serif: ['"MedievalSharp"', "serif"],
      // o podés usar UnifrakturCook
    },
  },
};

export default nextConfig;
