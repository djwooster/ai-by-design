import type { Metadata } from "next";
import { GeoIcon, type IconName } from "@/components/icons/GeoIcon";
import { PageHeader } from "@/components/layout/PageHeader";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CourseBand } from "@/components/shared/CourseBand";
import { ProductCard } from "@/components/shop/ProductCard";
import { Container } from "@/components/ui/Container";
import { products } from "@/lib/content/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Playbooks, prompt packs and starter kits for shipping apps with Claude Code, from real builds.",
};

const steps: { icon: IconName; name: string; body: string }[] = [
  { icon: "arrow", name: "Pay with Stripe", body: "Checkout runs on Stripe. No account to create." },
  { icon: "check", name: "Get it instantly", body: "The download link lands in your inbox the moment you pay." },
  { icon: "build", name: "Use it on your build", body: "Drop it into the project you're shipping today." },
];

export default function ShopPage() {
  return (
    <>
      <PageHeader
        label="Shop · Instant delivery"
        title="Tools from real builds."
        accent="real builds."
        lede="The playbooks, prompts and project setups I use to ship my own apps, packaged so you can use them today."
      />

      <Container>
        <Stagger className="grid grid-cols-1 gap-x-4 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <StaggerItem key={product.slug}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger as="ol" className="mt-24 grid grid-cols-1 border-t border-line md:grid-cols-3">
          {steps.map((step, index) => (
            <StaggerItem
              key={step.name}
              as="li"
              className={index > 0 ? "border-line py-8 md:border-l md:px-8" : "py-8 md:pr-8"}
            >
              <GeoIcon name={step.icon} size={20} className="text-fg-muted" />
              <h3 className="mt-5 text-heading text-fg">{step.name}</h3>
              <p className="mt-1.5 max-w-[20rem] text-ui text-fg-secondary">{step.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      <div className="pt-16 md:pt-20">
        <CourseBand
          placement="shop"
          title="Want the whole process?"
          body="The course takes you from idea to App Store, phase by phase, with two live calls a week."
        />
      </div>
    </>
  );
}
