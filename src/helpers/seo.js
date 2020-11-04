export function seo(data = {}) {
  const manifest = {
    short_name: "Ecommerce App",
    name: "Ecommerce App - Nuppin",
    start_url: ".",
    display: "standalone",
    theme_color: "#000000",
    background_color: "#ffffff",
  };

  data.title = data.title || "Ecommerce from nuppin marketplace";
  data.metaDescription = data.metaDescription || "This is a ecommerce powered by nuppin";
  data.favicon = data.favicon || "";
  data.manifest = data.manifest || manifest;

  document.title = data.title;
  document.querySelector('meta[name="description"]').setAttribute("content", data.metaDescription);
  document.querySelector('link[rel="icon"]').setAttribute("href", data.favicon);
  document.querySelector('link[rel="manifest"]').setAttribute("href", data.manifest);
}
