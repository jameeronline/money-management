import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "epxc4tmt",
  dataset: "production",
  apiVersion: "2024-03-11",
  useCdn: false,
});
