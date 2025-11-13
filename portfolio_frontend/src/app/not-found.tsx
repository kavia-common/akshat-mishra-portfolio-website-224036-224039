import React from "react";

/**
 * PUBLIC_INTERFACE
 * NotFound - Default 404 page for the App Router.
 */
export const dynamic = "error"; // ensure static export doesn't attempt dynamic rendering for 404

export default function NotFound() {
  return (
    <main className="app-container">
      <section className="card" role="alert" aria-live="assertive">
        <header className="header">
          <h1 className="title">404 – Page Not Found</h1>
          <p className="subtitle">The page you’re looking for doesn’t exist.</p>
        </header>
      </section>
    </main>
  );
}
