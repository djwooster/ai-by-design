import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { refunds } from "@/lib/content/legal";

export const metadata: Metadata = { title: refunds.title };

export default function RefundsPage() {
  return <LegalPage doc={refunds} />;
}
