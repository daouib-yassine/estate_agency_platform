import React from 'react';

const Stats = () => {
  // Keeping data in an array makes it easy to move to an API later
  const statsData = [
    { num: '1,800+', label: 'Properties Listed' },
    { num: '98%', label: 'Client Satisfaction' },
    { num: '25 yrs', label: 'Market Experience' },
    { num: '14', label: 'Cities Covered' },
  ];

  return (
    <section className="grid grid-cols-2 bg-[#0f1f3d] md:grid-cols-4">
      {statsData.map((stat, i) => (
        <div 
          key={i} 
          className="border-r border-white/10 py-10 text-center last:border-r-0 hover:bg-white/5 transition-colors duration-300"
        >
          <div className="font-serif text-4xl text-[#d4b87a]">
            {stat.num}
          </div>
          <div className="mt-2 text-[10px] uppercase tracking-widest text-white/50">
            {stat.label}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Stats;