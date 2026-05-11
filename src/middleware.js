export { default } from "next-auth/middleware";

export const config = { 
  // This protects the entire admin suite and attendance station
  matcher: ["/admin/:path*", "/attendance/:path*"] 
};