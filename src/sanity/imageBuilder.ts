import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder({
  projectId: "iim5qsfe",
  dataset: "production",
});

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
