// src/app/properties/layout.jsx

export default function PropertiesLayout({ children }) {
  return (
    <section className="properties-wrapper">
      {/* You can add a shared sidebar or header here */}
      <main>{children}</main>
    </section>
  );
}