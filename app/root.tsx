import type { ReactElement } from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import type { MetaFunction, LinksFunction } from "remix";
import styles from "./tailwind.css";

export const meta: MetaFunction = () => {
  const description = "A simple list of UI / React challenges bootstrapped with Remix and Tailwind.";

  return {
    title: "Remix - UI Challenges",
    description,
    keywords: "Remix,React,UI",
    "twitter:creator": "@kevinkieninger",
    "twitter:description": description,
  };
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
  ]
};

const Document = ({ children, title = "UI Challenges" }: { children: ReactElement | ReactElement[]; title?: string; }) => (
  <html lang="en" className="text-gray-100 bg-slate-900">
    <head>
      <meta charSet="utf-8" />
      <Meta />
      <title>{title}</title>
      <Links />
    </head>
    <body>
      {children}
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

const App = () => (
  <Document>
    <Outlet />
    <ScrollRestoration />
  </Document>
);

export const ErrorBoundary = ({ error }: { error: Error }) => (
  <Document title="Uh oh!">
    <div className="error-container">
      <h1>App Error</h1>
      <pre>{error.message}</pre>
    </div>
  </Document>
);

export const CatchBoundary = () => {
  const caught = useCatch();

  return (
    <Document
      title={`${caught.status} ${caught.statusText}`}
    >
      <div className="error-container">
        <h1>
          {`${caught.status} ${caught.statusText}`}
        </h1>
      </div>
    </Document>
  )
}

export default App;
