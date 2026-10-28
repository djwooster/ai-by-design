import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { offer } from "@/lib/content/offer";

export const metadata: Metadata = { title: "Refund policy" };

export default function RefundsPage() {
  return (
    <LegalPage title="Refund policy">
      <p>{offer.guarantee}</p>
      <p>[TODO: legal]</p>
    </LegalPage>
  );
}
