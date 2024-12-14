// contentfulClient.js
import { createClient } from "contentful";

const client = createClient({
  space: import.meta.env.VITE_spaceID,
  accessToken: import.meta.env.VITE_accessToken,
});

export default client;
