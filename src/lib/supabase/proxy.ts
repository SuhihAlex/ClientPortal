import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import {
  getCurrentMembership,
  getRoleDestination,
} from "@/lib/auth/membership";
import { assertSupabaseConfig } from "@/lib/supabase/config";

const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
];

function isAuthRoute(pathname: string) {
  return authRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isStudioRoute(pathname: string) {
  return pathname === "/app" || pathname.startsWith("/app/");
}

function isClientRoute(pathname: string) {
  return (
    pathname === "/portal" || pathname.startsWith("/portal/")
  );
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const { url, publishableKey } = assertSupabaseConfig();

  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },

      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({
          request,
        });

        cookiesToSet.forEach(
          ({ name, value, options }) => {
            response.cookies.set(name, value, options);
          },
        );
      },
    },
  });

  const { data: claimsData } = await supabase.auth.getClaims();

  const userId =
    typeof claimsData?.claims?.sub === "string"
      ? claimsData.claims.sub
      : null;

  const pathname = request.nextUrl.pathname;

  const protectedRoute =
    isStudioRoute(pathname) || isClientRoute(pathname);

  if (!userId) {
    if (protectedRoute) {
      const loginUrl = request.nextUrl.clone();

      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("next", pathname);

      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  let membership = null;

  try {
    membership = await getCurrentMembership(
      supabase,
      userId,
    );
  } catch {
    if (protectedRoute) {
      const loginUrl = request.nextUrl.clone();

      loginUrl.pathname = "/login";
      loginUrl.searchParams.set(
        "error",
        "workspace_lookup_failed",
      );

      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  if (isAuthRoute(pathname) && membership) {
    const destination = request.nextUrl.clone();

    destination.pathname = getRoleDestination(
      membership.role,
    );
    destination.search = "";

    return NextResponse.redirect(destination);
  }

  if (isStudioRoute(pathname)) {
    if (!membership) {
      const loginUrl = request.nextUrl.clone();

      loginUrl.pathname = "/login";
      loginUrl.searchParams.set(
        "error",
        "workspace_missing",
      );

      return NextResponse.redirect(loginUrl);
    }

    if (membership.role === "client") {
      const portalUrl = request.nextUrl.clone();

      portalUrl.pathname = "/portal";
      portalUrl.search = "";

      return NextResponse.redirect(portalUrl);
    }
  }

  if (isClientRoute(pathname)) {
    if (!membership) {
      const loginUrl = request.nextUrl.clone();

      loginUrl.pathname = "/login";
      loginUrl.searchParams.set(
        "error",
        "workspace_missing",
      );

      return NextResponse.redirect(loginUrl);
    }

    if (membership.role !== "client") {
      const appUrl = request.nextUrl.clone();

      appUrl.pathname = "/app";
      appUrl.search = "";

      return NextResponse.redirect(appUrl);
    }
  }

  return response;
}