export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
    ],
    sitemap: "https://fourwanders.com/sitemap.xml",
  };
}
