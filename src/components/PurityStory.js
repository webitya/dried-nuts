'use client';

import { Check, ShieldCheck, Timer, Zap } from 'lucide-react';

export default function PurityStory() {
  const points = [
    {
      title: 'Farm Direct',
      desc: 'Eliminating middlemen to ensure the highest quality produce is sourced directly from original orchards.',
      icon: Zap
    },
    {
      title: 'Natural Air Drying',
      desc: 'No sulfur, no chemicals. We let nature take the lead in our slow-drying process to preserve essential minerals.',
      icon: ShieldCheck
    },
    {
      title: 'Small-Batch Sorting',
      desc: 'Every single nut passes through manual inspection. If it’s not perfect, it doesn’t make it to your box.',
      icon: Timer
    }
  ];

  return (
    <section className="py-24 bg-[#1A110B] text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-12">
            <div>
              <p className="text-orange-600 text-[10px] font-bold uppercase tracking-wider mb-4">Our Standard</p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
                The Uncompromising <br />
                <span className="text-orange-500 font-bold">Path to Purity.</span>
              </h2>
              <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-xl">
                At Fusion of Dried Nuts, we don't believe in industrial shortcuts. Luxury is defined by the patience required to prepare something truly natural.
              </p>
            </div>

            <div className="space-y-10">
              {points.map((p, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                    <p.icon size={24} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold uppercase tracking-wide leading-none mt-1">{p.title}</h4>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-sm">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-[4rem] border-2 border-white/5 p-4 relative overflow-hidden group">
              <div className="w-full h-full rounded-[3rem] bg-[#2D241E] p-8 flex flex-col justify-end relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <div className="relative z-20 space-y-4">
                  <div className="w-12 h-1 w-orange-600" />
                  <h3 className="text-3xl font-bold tracking-tight leading-tight">
                    "Every crunch is a <br /> 
                    testament to our legacy."
                  </h3>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">100% Quality Guaranteed</p>
                </div>
              </div>

              {/* Parallax Floating Cards */}
              <div className="absolute top-12 -right-6 bg-white p-4 rounded-2xl shadow-2xl animate-float group-hover:scale-110 transition-transform">
                <div className="text-orange-600 font-bold text-xs uppercase tracking-wide mb-1">Purity Score</div>
                <div className="text-2xl font-bold text-gray-900 tracking-tighter">99.9%</div>
              </div>

              <div className="absolute bottom-20 -left-6 bg-[#2D241E] border border-white/10 p-5 rounded-3xl shadow-2xl animate-float delay-700">
                <div className="flex gap-1 text-orange-500 mb-2">
                  {[...Array(5)].map((_, i) => <Check key={i} size={14} className="bg-orange-600 text-white rounded-full p-0.5" />)}
                </div>
                <div className="text-[9px] font-bold text-white uppercase tracking-wide">Lab Certified</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
