import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.role === "ADMIN";
      }
      if (req.nextUrl.pathname.startsWith("/account/dashboard")) return Boolean(token);
      if (req.nextUrl.pathname.startsWith("/account/profile")) return Boolean(token);
      if (req.nextUrl.pathname.startsWith("/account/wishlist")) return Boolean(token);
      return true;
    }
  },
  pages: {
    signIn: "/account/login"
  }
});

export const config = {
  matcher: ["/admin/:path*", "/account/dashboard/:path*", "/account/profile/:path*", "/account/wishlist/:path*"]
};
