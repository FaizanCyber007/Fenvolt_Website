import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext adapter configuration for Cloudflare Workers.
 * The site has no ISR or revalidation, so the default cache is enough.
 */
export default defineCloudflareConfig({});
