import { Metadata } from 'next';
import { siteConfig } from '@/data/site-config';

/**
 * Generates consistent metadata for any page.
 * Handles Open Graph, Twitter cards, and canonical URLs.
 */
export function createMetadata({
  title,
  description,
  path = '',
  image,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const pageTitle = title
    ? `${title} — ${siteConfig.name}`
    : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const pageUrl = `${siteConfig.url}${path}`;
  const pageImage = image || siteConfig.ogImage;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: siteConfig.name,
      images: [{ url: pageImage, width: 1200, height: 630 }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
