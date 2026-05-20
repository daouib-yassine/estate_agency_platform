'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

/**
 * Custom Hook to dynamically parse and manage url string language filters.
 * @param {string} defaultLang - Fallback language selection ('fr', 'ar', 'en')
 */
export function useLanguage(defaultLang = 'fr') {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // 1. Dynamically parse the '?lang=' query filter directly from the URL string
  const langParam = searchParams.get('lang');

  // 2. Safely validate the parameter token against your platform's supported list
  const currentLang = 
    langParam === 'fr' || langParam === 'en' || langParam === 'ar'
      ? langParam
      : defaultLang;

  // 3. Helper engine to change languages by updating the browser query state
  const setLanguage = (newLang) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', newLang);
    
    // Smoothly push the newly filtered URL string back into the Next.js router frame
    router.push(`${pathname}?${params.toString()}`);
  };

  // 4. Check if text direction needs to flip to Right-To-Left (RTL) for Arabic typography
  const dir = currentLang === 'ar' ? 'rtl' : 'ltr';

  return {
    currentLang,
    setLanguage,
    dir,
    isRTL: currentLang === 'ar',
  };
}