import { Suspense } from "react";
import PortfolioDetailClient from "../PortfolioDetailClient";

const loadingFallback = <div>Loading...</div>;

export default function Page() {
  return (
    <Suspense fallback={loadingFallback}>
      <PortfolioDetailClient />
    </Suspense>
  );
}
