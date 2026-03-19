import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_TITLE,
  buildBreadcrumbSchema,
  buildOrganizationSchema,
  buildWebsiteSchema,
  getCanonicalPath,
  normalizeKeywords,
  toAbsoluteUrl,
} from '../utils/seo';

const SCRIPT_SELECTOR = 'script[data-seo-script="true"]';

const setMetaTag = ({ key, value, attribute = 'name' }) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
};

const setLinkTag = ({ rel, href, extras = {} }) => {
  const selectorExtras = Object.entries(extras)
    .map(([key, value]) => `[${key}="${value}"]`)
    .join('');
  let element = document.head.querySelector(`link[rel="${rel}"]${selectorExtras}`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    Object.entries(extras).forEach(([key, value]) => element.setAttribute(key, value));
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

const SEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  type = 'website',
  canonicalPath,
  noindex = false,
  schema = [],
  includeBreadcrumbSchema = true,
  includeDefaultSchemas = true,
}) => {
  const location = useLocation();

  const pathname = useMemo(
    () => canonicalPath || getCanonicalPath(location.pathname),
    [canonicalPath, location.pathname],
  );

  const canonicalUrl = useMemo(() => toAbsoluteUrl(pathname), [pathname]);
  const absoluteImage = useMemo(() => toAbsoluteUrl(image), [image]);
  const serializedKeywords = useMemo(() => normalizeKeywords(keywords), [keywords]);

  useEffect(() => {
    document.title = title;
    document.documentElement.lang = 'en-IN';

    setMetaTag({ key: 'description', value: description });
    setMetaTag({ key: 'keywords', value: serializedKeywords });
    setMetaTag({ key: 'robots', value: noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' });
    setMetaTag({ key: 'googlebot', value: noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' });

    setMetaTag({ key: 'og:type', value: type, attribute: 'property' });
    setMetaTag({ key: 'og:site_name', value: 'ModSouls', attribute: 'property' });
    setMetaTag({ key: 'og:locale', value: 'en_IN', attribute: 'property' });
    setMetaTag({ key: 'og:title', value: title, attribute: 'property' });
    setMetaTag({ key: 'og:description', value: description, attribute: 'property' });
    setMetaTag({ key: 'og:image', value: absoluteImage, attribute: 'property' });
    setMetaTag({ key: 'og:image:alt', value: imageAlt, attribute: 'property' });
    setMetaTag({ key: 'og:url', value: canonicalUrl, attribute: 'property' });

    setMetaTag({ key: 'twitter:card', value: 'summary_large_image' });
    setMetaTag({ key: 'twitter:title', value: title });
    setMetaTag({ key: 'twitter:description', value: description });
    setMetaTag({ key: 'twitter:image', value: absoluteImage });
    setMetaTag({ key: 'twitter:image:alt', value: imageAlt });

    setLinkTag({ rel: 'canonical', href: canonicalUrl });
    setLinkTag({ rel: 'alternate', href: canonicalUrl, extras: { hreflang: 'en-IN' } });
    setLinkTag({ rel: 'alternate', href: canonicalUrl, extras: { hreflang: 'x-default' } });

    document.head.querySelectorAll(SCRIPT_SELECTOR).forEach((node) => node.remove());

    const scripts = [];
    if (includeDefaultSchemas) {
      scripts.push(buildOrganizationSchema(), buildWebsiteSchema());
    }
    if (includeBreadcrumbSchema) {
      const breadcrumbSchema = buildBreadcrumbSchema(pathname);
      if (breadcrumbSchema) scripts.push(breadcrumbSchema);
    }
    if (schema) {
      scripts.push(...(Array.isArray(schema) ? schema : [schema]));
    }

    scripts.filter(Boolean).forEach((entry) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoScript = 'true';
      script.text = JSON.stringify(entry);
      document.head.appendChild(script);
    });
  }, [absoluteImage, canonicalUrl, description, imageAlt, includeBreadcrumbSchema, includeDefaultSchemas, noindex, pathname, schema, serializedKeywords, title, type]);

  return null;
};

export default SEO;
