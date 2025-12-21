import { Suspense } from "react";
import PaketClient from "./PaketClient";

export const metadata = {
  title: "Tour Packages Bali | FourWanders Travel",
  description:
    "Jelajahi paket wisata Bali terbaik: One Day Tour, Island Tour, hingga Full Trip bersama FourWanders Travel.",
};

export default function PaketPage() {
  return (
    <Suspense fallback={<p className="text-center mt-20">Loading...</p>}>
      <PaketClient />
    </Suspense>
  );
}
