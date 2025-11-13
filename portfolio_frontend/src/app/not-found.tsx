import React from "react";

/**
 * PUBLIC_INTERFACE
 * NotFound - Default 404 page for the App Router.
 */
export const dynamic = "error";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center">
      <section className="card px-6 py-8" role="alert" aria-live="assertive">
        <header className="text-center">
          <h1 className="text-2xl font-bold mb-2">404 – Page Not Found</h1>
          <p className="text-slate-600">The page you’re looking for doesn’t exist.</p>
        </header>
      </section>
    </main>
  );
}
