import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessClient />
    </Suspense>
  );
}
