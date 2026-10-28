import type { Metadata } from "next";
import { EmptyState } from "@/components/layout/EmptyState";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Free App Store submission checklist",
  description: "[TODO: copy] Every step between a finished build and a live App Store listing.",
};

export default function ChecklistPage() {
  return (
    <>
      <PageHeader
        label="Free · App Store submission checklist"
        title="Get your app through review."
        lede="[TODO: copy] The checklist I use to submit to the App Store, free in your inbox."
      />
      <Container className="pb-24">
        <EmptyState stage="Stage 4" title="Opt-in and confirmation">
          What&apos;s in the checklist, the email capture, and the confirmation state after signing
          up.
        </EmptyState>
      </Container>
    </>
  );
}
