import { Suspense } from "react";
import BookNowClient from "./BookNowClient";

export default function BookNowPage() {
  return (
    <Suspense fallback={<p className="text-center mt-20">Loading booking...</p>}>
      <BookNowClient />
    </Suspense>
  );
}
