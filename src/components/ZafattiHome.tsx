/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Search, Heart, Music, Play, Pause, ChevronRight, HelpCircle, Star, Sparkles, MessageCircle, Clock, ShieldCheck, Trophy, Layers, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Track, Category, Review } from '../types';
import { DEFAULT_CATEGORIES } from '../data/defaultZaffat';

interface ZafattiHomeProps {
  tracks: Track[];
  onSelectTrackForPlay: (track: Track) => void;
  currentlyPlayingTrack: Track | null;
  isPlayingGlobal: boolean;
  onTogglePlayGlobal: () => void;
  onNavigateToCustomizer: (track: Track | null) => void;
  onNavigateToAdmin: () => void;
  reviews: Review[];
}

export default function ZafattiHome({
  tracks,
  onSelectTrackForPlay,
  currentlyPlayingTrack,
  isPlayingGlobal,
  onTogglePlayGlobal,
  onNavigateToCustomizer,
  onNavigateToAdmin,
  reviews
}: ZafattiHomeProps) {
  // Filters
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Local likes tracking
  const [likedTrackIds, setLikedTrackIds] = useState<Record<string, boolean>>({});

  const toggleLocalLike = (id: string) => {
    setLikedTrackIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filtered tracks list
  const filteredTracks = tracks.filter(track => {
    const matchesCategory = selectedCategory === 'all' || track.category === selectedCategory;
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          track.singer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (track.originalArtist && track.originalArtist.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="zafatti-store-front" className="min-h-screen bg-[#fdfcfb] text-slate-800 pb-28">
      {/* Upper bar with logo and simple navigation */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          {/* Brand/Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#c5a059] flex items-center justify-center shadow-sm">
              <span className="font-heading text-lg md:text-xl font-bold text-white">ز</span>
            </div>
            <div className="text-right">
              <h1 className="font-heading text-lg md:text-2xl font-bold text-[#c5a059] tracking-wide leading-none">
                زفــــاتي
              </h1>
              <span className="text-[10px] md:text-xs text-slate-550 font-sans">أفراح ومناسبات مخصصة بالكامل</span>
            </div>
          </div>

          {/* Quick Info Menu */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <a href="#about-section" className="hover:text-[#c5a059] transition-colors">عن زفاتي</a>
            <a href="#tracks-section" className="hover:text-[#c5a059] transition-colors">استكشف الألحان</a>
            <a href="#features-section" className="hover:text-[#c5a059] transition-colors">خدماتنا الملكية</a>
            <a href="#testimonials-section" className="hover:text-[#c5a059] transition-colors">تجارب العرايس</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToAdmin}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs md:text-sm px-4 py-2 rounded-full transition-all font-sans cursor-pointer flex items-center gap-1.5"
            >
              <span>لوحة الإدارة ⚜️</span>
            </button>
            
            <button
              onClick={() => onNavigateToCustomizer(null)}
              className="bg-[#c5a059] hover:bg-[#b4904d] text-white font-semibold text-xs md:text-sm px-5 py-2.5 rounded-full shadow-md transition-all font-sans cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-4 h-4 ml-1" />
              <span>فصل زفتك الخاصة</span>
            </button>
          </div>
        </div>
      </header>

      {/* Majestic Hero Showcase Banner */}
      <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-white py-16 md:py-24 px-4 text-center">
        {/* Background Overlay Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#c5a059]/10 via-slate-950/60 to-slate-950 opacity-85 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent" />
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-6 md:space-y-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#c5a059] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>تسجيل وتوزيع زفات الأعراس الخليجية بأرقى المعايير</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-3xl md:text-6xl font-medium leading-tight text-white tracking-normal"
          >
            صوت فرحتكِ بنكهة مخصصة <br />
            <span className="font-semibold bg-gradient-to-r from-[#e0c58a] via-[#c5a059] to-[#b4904d] bg-clip-text text-transparent">بالأسماء والأشعار</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-slate-300 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-sans"
          >
            استمعي لمجموعة حصرية من أرقى زفات زفات مسار كوشة العروس، دخول العريس، وشيلات الترحيب. صممي مظهر فرقتك ووفري التعديلات مجانًا حتى ترضيكِ بأسلوب ملكي خالص.
          </motion.p>

          {/* Luxury Search Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-slate-900/80 border border-[#c5a059]/35 p-2 rounded-2xl max-w-xl mx-auto flex items-center shadow-2xl backdrop-blur"
          >
            <div className="flex-1 relative">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 animate-pulse" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن: زفة طلّت، دخول، راشد الماجد، دفوف..."
                className="w-full pl-4 pr-11 py-3 bg-transparent outline-none border-none text-white placeholder-slate-400 font-sans text-sm text-right"
              />
            </div>
            <button
              onClick={() => {
                const element = document.getElementById('tracks-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-[#c5a059] to-[#b4904d] text-slate-950 font-semibold text-xs md:text-sm px-6 py-3 rounded-xl transition-all hover:scale-105"
            >
              ابحث الآن
            </button>
          </motion.div>

          {/* Quick stat features badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-slate-800/60">
            <div className="flex items-center gap-2.5 justify-center md:border-l border-slate-800/80 last:border-0 pb-2 md:pb-0">
              <Clock className="w-5 h-5 text-[#c5a059] flex-shrink-0" />
              <div className="text-right">
                <span className="text-xs text-slate-400 block leading-tight">تنفيذ سريع خلال</span>
                <span className="text-sm font-semibold text-slate-200">24 إلى 48 ساعة</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 justify-center md:border-l border-slate-800/80 last:border-0 pb-2 md:pb-0">
              <ShieldCheck className="w-5 h-5 text-[#c5a059] flex-shrink-0" />
              <div className="text-right">
                <span className="text-xs text-slate-400 block leading-tight">تعديلات بروفات</span>
                <span className="text-sm font-semibold text-slate-200">مجانية بالكامل</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 justify-center md:border-l border-slate-800/80 last:border-0">
              <Trophy className="w-5 h-5 text-[#c5a059] flex-shrink-0" />
              <div className="text-right">
                <span className="text-xs text-slate-400 block leading-tight">تاريخ حافل بـ</span>
                <span className="text-sm font-semibold text-slate-200">+10 آلاف زفة</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 justify-center">
              <Layers className="w-5 h-5 text-[#c5a059] flex-shrink-0" />
              <div className="text-right">
                <span className="text-xs text-slate-400 block leading-tight">إصدارات</span>
                <span className="text-sm font-semibold text-slate-200">بالموسيقى أو بالدف</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Music Exploration Store */}
      <section id="tracks-section" className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-slate-500 mb-1 font-sans text-xs uppercase tracking-wider font-semibold">
              <span className="w-8 h-px bg-slate-300 inline-block" />
              <span>المكتبة الصوتية والأرشيف</span>
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-slate-900">
              استكشف ديمو زفات ليلة العمر
            </h3>
            <p className="text-slate-500 text-xs md:text-sm mt-1 max-w-lg font-sans">
              استمع للمقاطع التمثيلية، وفي حال عجبك اللحن، كليك على زر "طلب وتعديل بالاسم" لتفصيلها بأسماء عريسكم وتعديل الإيقاعات.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-500 font-sans shadow-sm font-medium">
            <Filter className="w-4 h-4 text-[#c5a059]" />
            <span>تصفية التصنيفات متوفرة بالأسفل</span>
          </div>
        </div>

        {/* Category filtering pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 -mx-4 px-4 scrollbar-none">
          {DEFAULT_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-800/10 border-slate-900'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Catalog Content Grid */}
        {filteredTracks.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-250 max-w-lg mx-auto shadow-sm">
            <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-4 border border-slate-100">
              <Music className="w-7 h-7" />
            </div>
            <h4 className="font-heading text-lg font-bold text-slate-800">لم يتم العثور على زفات تطابق بحثك</h4>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed max-w-xs mx-auto font-sans">
              جرب تغيير الكلمات المفتاحية لمثلاً (دخول، طلّت) أو تصفح جميع الفئات للعثور على اللحن المناسب لك.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-4 bg-slate-900 hover:bg-black text-[#c5a059] font-semibold text-xs px-4 py-2 rounded-xl transition-all"
            >
              عرض كافة التصنيفات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTracks.map((track) => {
              const isPlayingThis = currentlyPlayingTrack?.id === track.id;
              const hasLikedThis = !!likedTrackIds[track.id];
              return (
                <div
                  key={track.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group relative"
                >
                  {/* Premium Badge Layer */}
                  {track.isPremium && (
                    <div className="absolute top-3 left-3 bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30 text-[10px] font-semibold px-2 py-0.5 rounded-full z-10 flex items-center gap-0.5">
                      <Sparkles className="w-3 h-3" />
                      <span>زفة ملكي لحن حصري</span>
                    </div>
                  )}

                  {/* Header Song Preview */}
                  <div className="p-5 flex-1 select-none">
                    <div className="flex items-start gap-4">
                      {/* Play/Pause Button on track */}
                      <button
                        onClick={() => {
                          if (isPlayingThis) {
                            onTogglePlayGlobal();
                          } else {
                            onSelectTrackForPlay(track);
                          }
                        }}
                        className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all flex-shrink-0 cursor-pointer ${
                          isPlayingThis 
                            ? 'bg-gradient-to-r from-[#c5a059] to-[#b4904d] border-none text-white shadow-md scale-105'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800 hover:scale-105'
                        }`}
                        title={isPlayingThis && isPlayingGlobal ? 'إيقاف' : 'استماع للديمو'}
                      >
                        {isPlayingThis && isPlayingGlobal ? (
                          <Pause className="w-5 h-5 fill-current" />
                        ) : (
                          <Play className="w-5 h-5 fill-current translate-x-[-1px]" />
                        )}
                      </button>

                      <div className="text-right flex-1 min-w-0">
                        <span className="text-[10px] text-[#c5a059] font-semibold block mb-0.5">
                          {DEFAULT_CATEGORIES.find(c => c.id === track.category)?.name || 'موسيقى الأعراس'}
                        </span>
                        <h4 className="font-heading font-bold text-sm md:text-base text-slate-900 group-hover:text-[#b4904d] transition-colors line-clamp-1">
                          {track.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-sans mt-0.5 truncate">
                          {track.singer}
                        </p>
                      </div>
                    </div>

                    {/* Metadata visual indicators */}
                    <div className="flex justify-between items-center mt-5 pt-4 border-t border-slate-100 text-xs text-slate-400 font-sans">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 opacity-80" />
                        <span>المدة: {track.duration}</span>
                      </span>

                      {track.originalArtist && (
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px]">
                          اللحن للفنان: {track.originalArtist}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions purchase and customize block */}
                  <div className="bg-slate-50/80 px-5 py-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block leading-none mb-1">سعر التفصيل بدءاً من</span>
                      <span className="text-[#c5a059] font-semibold font-mono text-base">{track.price} <span className="text-[10px] font-sans">ر.س</span></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleLocalLike(track.id)}
                        className={`p-2.5 rounded-xl border transition-colors ${
                          hasLikedThis 
                            ? 'bg-rose-50 border-rose-200 text-rose-500' 
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600'
                        }`}
                        title="أعجبني"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>

                      <button
                        onClick={() => onNavigateToCustomizer(track)}
                        className="bg-slate-900 hover:bg-slate-950 text-white hover:text-[#c5a059] font-semibold text-xs py-2.5 px-3.5 rounded-xl transition-all font-sans cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        <span>تعديل بالاسم </span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#c5a059] transform rotate-180" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Showcase Call Out builder Banner */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-950 to-slate-950 text-white p-8 md:p-12 relative overflow-hidden border border-[#c5a059]/20 shadow-xl">
          <div className="absolute top-0 left-0 w-48 h-48 bg-[#c5a059]/5 rounded-br-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#b4904d]/5 rounded-tl-full pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl text-right space-y-4">
            <span className="bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/35 text-xs px-3.5 py-1.5 rounded-full font-semibold uppercase tracking-wider inline-block">
              أنتِ من تقررين وتصممي اللحن
            </span>
            <h3 className="font-heading text-xl md:text-3xl font-bold tracking-normal leading-tight">
              هل تبحثين عن تصميم زفة بأفكار مخصصة غير معروضة؟
            </h3>
            <p className="text-slate-300 text-xs md:text-base font-sans leading-relaxed">
              وفري طلبية الزفة الخاصة من البداية! سجلي معنا أسماء العرسان والمنشد أو الفنان الذي ترغبين بمحاكاته، بالإضافة إلى صياغة أبيات شعرية خاصة من أرقى مجهور القريحة.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateToCustomizer(null)}
                className="bg-gradient-to-r from-[#c5a059] to-[#b4904d] hover:brightness-110 text-white font-semibold text-xs md:text-sm px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer"
              >
                صممي زفتك الخاصة بالكامل
              </button>
              
              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs md:text-sm px-5 py-3 rounded-full transition-all flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>استشارة مجانية على الواتساب</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section id="features-section" className="bg-slate-50 border-y border-slate-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-slate-900">
              لماذا استوديو زفاتي خياركِ الأمثل لليلة العمر؟
            </h3>
            <p className="text-slate-500 text-xs md:text-sm font-sans mx-auto">
              أرقامنا وخبرتنا الطويلة تتحدث عن الفخامة والجودة العالية التي نسكبها في أذان المهنئين عند زفّكم
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 text-right shadow-sm space-y-3">
              <div className="w-12 h-12 bg-[#fdfcfb] border border-[#c5a059]/20 rounded-xl flex items-center justify-center text-[#c5a059]">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-base text-slate-800">تنفيذ ودقة في المواعيد</h4>
              <p className="text-slate-500 text-xs md:text-sm font-sans leading-relaxed">
                نحن مبرمجون ومعدون بأقصى سرعة إنتاجية. يتلقى العرسان البروفات للتأكيد وحل أي عارض نطق سريعاً قبل التسليم النهائي بوقت كافٍ.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 text-right shadow-sm space-y-3">
              <div className="w-12 h-12 bg-[#fdfcfb] border border-[#c5a059]/20 rounded-xl flex items-center justify-center text-[#c5a059]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-base text-slate-800">بروفات تعديل غير محدودة مجاناً</h4>
              <p className="text-slate-500 text-xs md:text-sm font-sans leading-relaxed">
                رضاكم وسعادتكم في ليلة الزفاف هو دافعنا الأكبر. تظل بروفات الأسماء والنبرة قابلة للتغيير حتى تكون النتيجة 100% كما تمنيتموها.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 text-right shadow-sm space-y-3 col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-[#fdfcfb] border border-[#c5a059]/20 rounded-xl flex items-center justify-center text-[#c5a059]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-base text-slate-800">أفضل الأصوات والمنشدين والموزقين</h4>
              <p className="text-slate-500 text-xs md:text-sm font-sans leading-relaxed">
                نتعامل مع أرقى العازفين للمقامات الشرقية والخليجية ومؤدي الصوت بالدفوف الخليجية الحماسية لدعم دخول وخروج ملكي بالكامل.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials reviews list */}
      <section id="testimonials-section" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-slate-900">
            أراء وتجرب عرايسنا مع زفاتي
          </h3>
          <p className="text-slate-500 text-xs md:text-sm font-sans">
            شهادات حقيقية نعتز بها من أصحاب المناسبات السعيدة الذين تشرفنا بمشاركتهم زفاتهم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-right flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 mb-4 text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-sans font-medium">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                <div>
                  <h5 className="font-semibold text-slate-800">{rev.name}</h5>
                  <span className="text-[#c5a059] text-[10px] mt-0.5 block truncate">الزفة: {rev.zaffaTitle}</span>
                </div>
                <span className="text-slate-400 font-mono">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Static text FAQ / About section */}
      <section id="about-section" className="bg-white py-16 px-4 border-t border-slate-150">
        <div className="max-w-4xl mx-auto text-right space-y-6">
          <h3 className="font-heading text-2xl font-bold text-slate-850 border-r-4 border-[#c5a059] pr-3">
            عن استوديو زفاتي لزفات وموسيقى الأعراس والمناسبات
          </h3>
          <div className="text-slate-605 text-xs md:text-sm space-y-4 font-sans leading-relaxed">
            <p>
              تأسست منصة واستديوهات <strong>زفاتي</strong> لتزيل عقبات تعقيد تجهيز وصياغة ملفات الصوت ليلة العمر لليالي الفرح في الخليج والوطن العربي. نسعى لتمكين العرايس والعرسان وحفلات التخرج المتميزة من تجهيز ألحانهم وإيقاعاتهم المفضلة في خطوات ميسرة، وبأيدي نخبة من أكفأ مهندسي الصوت والموزعين الخليجيين بدون تكلفة إضافية باهظة وخروج مبهج وراقي يليق بهيبتكم.
            </p>
            <p>
              ndعم في خدماتنا كل من زفات دخول مسار العريس والعروس، الزفات الخاصة بمحاكاة نخبة من فناني العالم العربي، تجميع الدفوف الحماسية السريعة والبطيئة، بالإضافة إلى الصياغات الشعرية الراقية والترحيبية من كبار الشعراء لضمان تقديم تجربة متكاملة تتناسب مع رغبات وتوجّهات العائلات في حفلاتهم.
            </p>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="bg-slate-905 border-t border-slate-800 text-slate-400 py-12 px-4 text-center text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-[#c5a059] flex items-center justify-center text-white">
              <span className="font-heading text-lg font-bold text-[#c5a059]">ز</span>
            </div>
            <div className="text-right">
              <h4 className="font-heading text-white font-bold leading-none text-sm">زفاتي</h4>
              <span className="text-[10px] text-slate-500">منصتكم المفضلة لليالي الفرح الملكي</span>
            </div>
          </div>
          
          <p className="font-sans">
            حقوق الطبع والنشر © 2026 زفاتي كوم. جميع الحقوق محفوظة لفرق التحرير والتسجيل الصوتي الخليجي.
          </p>

          <div className="flex items-center gap-4 text-slate-300">
            <a href="#about-section" className="hover:text-[#c5a059] transition-colors">سياسة الخصوصية</a>
            <a href="#about-section" className="hover:text-[#c5a059] transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
