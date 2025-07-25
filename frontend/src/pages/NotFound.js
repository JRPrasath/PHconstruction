import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 Not Found | PaperHouse Construction</title>
        <meta name="description" content="Page not found on PaperHouse Construction." />
        <link rel="canonical" href="https://jrprasath.github.io/PHconstruction/404" />
        <meta property="og:url" content="https://jrprasath.github.io/PHconstruction/404" />
      </Helmet>
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-primary-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-10">
            <Link
              to="/"
              className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 