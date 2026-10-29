import { get } from "@vercel/blob";
import { getProduct } from "@/lib/content/products";
import { readToken } from "@/lib/shop/downloads";

/** Streams a product's file from the private Blob store, for a signed link that hasn't expired. */
export async function GET(_request: Request, { params }: RouteContext<"/api/download/[token]">) {
  const result = readToken((await params).token);
  if (!result.ok) {
    return new Response(
      result.reason === "expired"
        ? "This download link has expired. Reply to your delivery email for a new one."
        : "This download link isn't valid.",
      { status: result.reason === "expired" ? 410 : 404 },
    );
  }

  const product = getProduct(result.claim.slug);
  if (!product) return new Response("Not found", { status: 404 });

  const blob = await get(product.file.pathname, { access: "private" });
  if (!blob || blob.statusCode !== 200) return new Response("File not found", { status: 404 });

  return new Response(blob.stream, {
    headers: {
      "Content-Type": blob.blob.contentType,
      "Content-Length": String(blob.blob.size),
      "Content-Disposition": `attachment; filename="${product.file.filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
