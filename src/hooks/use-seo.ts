import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  canonical?: string;
}

export function useSEO({
  title,
  description,
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  canonical,
}: SEOProps) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = `${title} | My Health Integral`;
    }
    
    // Update meta description
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }
    
    // Update Open Graph title
    if (ogTitle) {
      const ogTitleTag = document.querySelector('meta[property="og:title"]');
      if (ogTitleTag) {
        ogTitleTag.setAttribute('content', `${ogTitle} | My Health Integral`);
      }
    }
    
    // Update Open Graph description
    if (ogDescription) {
      const ogDescTag = document.querySelector('meta[property="og:description"]');
      if (ogDescTag) {
        ogDescTag.setAttribute('content', ogDescription);
      }
    }
    
    // Update Twitter Card tags
    const twitterTitleTag = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleTag) {
      const titleContent = twitterTitle || ogTitle || title;
      if (titleContent) {
        twitterTitleTag.setAttribute('content', `${titleContent} | My Health Integral`);
      }
    }
    
    const twitterDescTag = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescTag) {
      const descContent = twitterDescription || ogDescription || description;
      if (descContent) {
        twitterDescTag.setAttribute('content', descContent);
      }
    }
    
    // Update canonical URL
    if (canonical) {
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', canonical);
    }
  }, [title, description, ogTitle, ogDescription, twitterTitle, twitterDescription, canonical]);
}