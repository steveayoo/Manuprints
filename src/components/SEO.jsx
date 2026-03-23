import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords, url, image }) => {
  const siteName = "Manuprints";
  const defaultDescription =
    "Manuprints — Nairobi's premier printing and branding studio. Custom t-shirts, hoodies, caps, 3D signages, corporate branding and screen printing services across Kenya.";
  const defaultKeywords =
    "printing nairobi, branding kenya, custom t-shirts nairobi, screen printing, 3D signage, corporate branding, hoodies printing, caps printing, manuprints";
  const defaultImage = "https://manuprints.bretoretaclients.co.ke/logo192.png";
  const baseUrl = "https://manuprints.bretoretaclients.co.ke";

  const fullTitle = title
    ? `${title} | ${siteName}`
    : `${siteName} — Premium Printing and Branding in Nairobi`;
  const fullDescription = description || defaultDescription;
  const fullKeywords = keywords
    ? `${keywords}, ${defaultKeywords}`
    : defaultKeywords;
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image || defaultImage;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content="Manuprints" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:locale" content="en_KE" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#2C1810" />
      <meta name="geo.region" content="KE-30" />
      <meta name="geo.placename" content="Nairobi" />
      <meta name="geo.position" content="-1.286389;36.817223" />
      <meta name="ICBM" content="-1.286389, 36.817223" />
    </Helmet>
  );
};

export default SEO;