import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacy } from "@/lib/content/legal";

export const metadata: Metadata = { title: privacy.title };

export default function PrivacyPage() {
  return <LegalPage doc={privacy} />;
}
