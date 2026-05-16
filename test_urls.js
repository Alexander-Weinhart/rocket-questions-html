const KNOWN_TRACK_ROUTE_SLUGS = ["netc-121", "network-plus", "security-plus"];
function detectAppBasePath(pathname) {
  const normalized = String(pathname || "/").split(/[?#]/, 1)[0];
  const segments = normalized.split("/").filter(Boolean);
  const trackIndex = segments.findIndex((segment) => KNOWN_TRACK_ROUTE_SLUGS.includes(segment));
  const baseSegments = trackIndex === -1 ? segments : segments.slice(0, trackIndex);
  return `/${baseSegments.length ? `${baseSegments.join("/")}/` : ""}`;
}

console.log("Root:", detectAppBasePath("/"));
console.log("Root with track:", detectAppBasePath("/netc-121"));
console.log("Subdir:", detectAppBasePath("/test1/"));
console.log("Subdir with track:", detectAppBasePath("/test1/netc-121"));
console.log("Root with file:", detectAppBasePath("/index.html"));
console.log("Subdir with file:", detectAppBasePath("/test1/index.html"));
