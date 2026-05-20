export default function RootLayout({ children, params: { locale } }) {
  // Arabic requires 'rtl', English and French require 'ltr'
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction}>
      <body className="bg-[#faf9f7] text-[#0f1f3d]">
        {children}
      </body>
    </html>
  );
}