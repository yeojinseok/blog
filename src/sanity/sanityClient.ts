import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "iim5qsfe",
  dataset: "production",
  useCdn: false,
});
