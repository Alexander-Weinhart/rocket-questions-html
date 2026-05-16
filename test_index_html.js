const KNOWN_TRACK_ROUTE_SLUGS = ["netc-121", "network-plus", "security-plus"];

function detectAppBasePath(pathname) {
  const normalized = String(pathname || "/").split(/[?#]/, 1)[0];
  let segments = normalized.split("/").filter(Boolean);
  
  // If the last segment is an html file, ignore it for base path detection
  if (segments.length > 0 && segments[segments.length - 1].endsWith(".html")) {
    segments = segments.slice(0, -1);
  }

  const trackIndex = segments.findIndex((segment) => KNOWN_TRACK_ROUTE_SLUGS.includes(segment));
  const baseSegments = trackIndex === -1 ? segments : segments.slice(0, trackIndex);
  return `/${baseSegments.length ? `${baseSegments.join("/")}/` : ""}`;
}

console.log("Root with index:", detectAppBasePath("/index.html"));
console.log("Subdir with index:", detectAppBasePath("/test1/index.html"));
console.log("Subdir without index:", detectAppBasePath("/test1/"));
