import { useEffect } from 'react';

export interface UseSEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
}

export function useSEO({ title, description, image, url, type = 'website' }: UseSEOProps) {
  useEffect(() => {
    if (!title) return;

    const originalTitle = document.title;
    const newTitle = title.includes('SportTech') ? title : `${title} | SportTech Türkiye`;
    document.title = newTitle;

    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://sporttech.com.tr';
    const fullUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const finalDescription = description || "SportTech Türkiye spor teknolojileri platformu.";
    
    let finalImageUrl = image || `${baseUrl}/og-image.png`;
    if (finalImageUrl && !finalImageUrl.startsWith('http')) {
      finalImageUrl = `${baseUrl}${finalImageUrl}`;
    }

    setMetaTag('name', 'description', finalDescription);
    setMetaTag('property', 'og:title', newTitle);
    setMetaTag('property', 'og:description', finalDescription);
    setMetaTag('property', 'og:image', finalImageUrl);
    setMetaTag('property', 'og:url', fullUrl);
    setMetaTag('property', 'og:type', type);
    
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', newTitle);
    setMetaTag('name', 'twitter:description', finalDescription);
    setMetaTag('name', 'twitter:image', finalImageUrl);
    setMetaTag('name', 'twitter:url', fullUrl);

    return () => {
      document.title = originalTitle;
    };
  }, [title, description, image, url, type]);
}
