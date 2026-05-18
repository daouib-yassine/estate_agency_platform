{NAV_ITEMS.map(({ icon: Icon, label, id, path }) => {
  // 🎯 If a custom path is declared, use it. Otherwise, fallback to the standard admin schema.
  const targetHref = path ? path : (id === 'dashboard' ? '/admin' : `/admin/${id}`);
  
  const isActive = pathname === targetHref;

  return (
    <Link
      key={id}
      href={targetHref}
      className={`flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left transition-all ${
        isActive 
          ? 'bg-[#b89a5a] text-white font-medium' 
          : 'text-white/50 hover:bg-white/5 hover:text-white/80'
      }`}
    >
      <Icon size={16} className="flex-shrink-0" />
      {isOpen && <span className="text-[12px] tracking-wide">{label}</span>}
      {isOpen && isActive && <ChevronRight size={12} className="ml-auto" />}
    </Link>
  );
})}