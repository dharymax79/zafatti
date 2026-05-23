/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Calendar, User, Music, HelpCircle, Sparkles, Check, Phone, ArrowLeft, Send, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Track, Order } from '../types';
import { FAMOUS_SINGERS } from '../data/defaultZaffat';

interface ZaffaCustomizerProps {
  initialTrack: Track | null;
  onOrderSubmitted: (order: Order) => void;
  onCancel: () => void;
}

export default function ZaffaCustomizer({
  initialTrack,
  onOrderSubmitted,
  onCancel
}: ZaffaCustomizerProps) {
  // Step manager
  const [step, setStep] = useState(1);

  // Form states
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [brideName, setBrideName] = useState('');
  const [groomName, setGroomName] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [singerId, setSingerId] = useState('studio');
  const [trackType, setTrackType] = useState<'with-music' | 'vocals-defs' | 'vocals-only'>('with-music');
  const [additionalPoetry, setAdditionalPoetry] = useState(false);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  
  // Custom AI Poetry builder (interactive fallback simulation)
  const [aiPoemGenerated, setAiPoemGenerated] = useState('');
  const [isGeneratingPoem, setIsGeneratingPoem] = useState(false);

  // Price calculations
  const [basePrice, setBasePrice] = useState(1000);
  const [totalPrice, setTotalPrice] = useState(1000);

  useEffect(() => {
    if (initialTrack) {
      setBasePrice(initialTrack.price);
    } else {
      setBasePrice(950); // custom empty zaffa standard price
    }
  }, [initialTrack]);

  useEffect(() => {
    const selectedSinger = FAMOUS_SINGERS.find(s => s.id === singerId);
    const singerOffset = selectedSinger ? selectedSinger.priceOffset : 0;
    const rhythmOffset = trackType === 'vocals-defs' ? 150 : trackType === 'vocals-only' ? 0 : 100;
    const poetryOffset = additionalPoetry ? 300 : 0;
    
    setTotalPrice(basePrice + singerOffset + rhythmOffset + poetryOffset);
  }, [basePrice, singerId, trackType, additionalPoetry]);

  // Generate automated luxury poem matching names
  const handleGeneratePoemMock = () => {
    if (!brideName || !groomName) {
      alert('الرجاء إدخال اسم العريس والعروس أولاً لتصميم قصيدة مخصصة.');
      return;
    }
    setIsGeneratingPoem(true);
    setTimeout(() => {
      const verses = [
        `أقبلت يا ليلة العمر بجمالها الرقاقِ... وتـزيـنـت ${brideName} بالـحـسـن والـبـهـاءِ`,
        `كـالبــدر في كـبـد الـسـماء هيبتها... والـخـلق يـمـشـي خـلـفـها بحياءِ`,
        `عريسنا ${groomName} يا عالي الشأن فخرنا... جاء يلقى حور العين بالصفاءِ`,
        `يا دبلة الفرح بالبركة والوفا تكللت... ويا رَب بارك لـهُـم طيلة مـدى البقاءِ`
      ];
      setAiPoemGenerated(verses.join('\n'));
      setIsGeneratingPoem(false);
    }, 1500);
  };

  const validateStep = (currentStep: number) => {
    const errors: string[] = [];
    if (currentStep === 1) {
      if (!buyerName.trim()) errors.push('يرجى إدخال اسم المشتري الثنائي.');
      if (!buyerPhone.trim() || buyerPhone.length < 9) errors.push('يرجى إدخال رقم جوال صحيح (يتكون من 9 أرقام على الأقل للواتساب).');
    }
    if (currentStep === 2) {
      if (!brideName.trim()) errors.push('يرجى كتابة اسم العروس للزفة.');
      if (!groomName.trim()) errors.push('يرجى كتابة اسم العريس للزفة.');
      if (!weddingDate) errors.push('يرجى اختيار تاريخ حفل الزفاف لجدولة التنفيذ والبروفات.');
    }
    setFormErrors(errors);
    return errors.length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    setFormErrors([]);
  };

  const handleSubmit = () => {
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    
    // Simulate API request and saving
    setTimeout(() => {
      const selectedSingerObj = FAMOUS_SINGERS.find(s => s.id === singerId);
      const newOrder: Order = {
        id: 'ord-' + Math.floor(Math.random() * 90000 + 10000),
        buyerName,
        buyerPhone,
        brideName,
        groomName,
        weddingDate,
        singerType: singerId === 'studio' ? 'studio-vocalist' : 'famous-singer',
        singerName: selectedSingerObj ? selectedSingerObj.name : 'استوديو زفاتي',
        trackType,
        additionalPoetry,
        notes: notes + (aiPoemGenerated ? `\n\n[القصيدة المختارة]:\n${aiPoemGenerated}` : ''),
        totalPrice,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      onOrderSubmitted(newOrder);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div id="zaffa-customizer-container" className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={onCancel}
        className="flex items-center gap-2 text-slate-600 hover:text-[#c5a059] transition-colors mb-6 font-sans self-start font-medium cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 flex-shrink-0" />
        <span>العودة للقائمة الرئيسية</span>
      </button>

      {/* Header card info */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-[#c5a059]/20 shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/5 rounded-bl-full pointer-events-none" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="bg-[#c5a059]/10 text-[#c5a059] px-3.5 py-1 rounded-full text-xs border border-[#c5a059]/30 font-medium">
              تفصيل زفة ملكية بالأسماء
            </span>
            <h1 className="text-2xl md:text-3xl font-heading font-medium text-white tracking-wide mt-2">
              {initialTrack ? `تعديل زفة: ${initialTrack.title}` : 'تصميم زفة جديدة كلياً حسب الطلب'}
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl font-sans leading-relaxed">
              قم بملء تفاصيل العرسان، واختر الموسيقى والأدوات الصوتية، وسيتولى مهندسو الصوت والمنشدون التجهيز والتسجيل بدقة كاملة.
            </p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center self-stretch sm:self-center">
            <span className="text-slate-400 text-xs block mb-1">التكلفة التقديرية</span>
            <span className="text-2xl md:text-3xl text-[#c5a059] font-semibold tracking-wider font-mono">{totalPrice}</span>
            <span className="text-slate-350 text-xs mr-1 opacity-80">ر.س</span>
          </div>
        </div>

        {/* Step progress bar */}
        <div className="mt-8 border-t border-slate-800 pt-6">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-800 -translate-y-1/2" />
            <div 
              className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-[#c5a059] to-[#b4904d] -translate-y-1/2 transition-all duration-300"
              style={{ width: `${((step - 1) / 3) * 100}%`, right: 'auto' }}
            />
            {[
              { id: 1, label: 'بيانات التواصل' },
              { id: 2, label: 'أسماء العرسان' },
              { id: 3, label: 'الصوت والألحان' },
              { id: 4, label: 'مراجعة وتأكيد' }
            ].map((s) => (
              <div key={s.id} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step >= s.id
                      ? 'bg-gradient-to-r from-[#c5a059] to-[#b4904d] text-white scale-110 shadow-lg shadow-[#c5a059]/20'
                      : 'bg-slate-800 border-2 border-slate-700 text-slate-400'
                  }`}
                >
                  {step > s.id ? <Check className="w-5 h-5 stroke-[2.5]" /> : s.id}
                </div>
                <span className="text-xs font-medium text-slate-400 mt-2 hidden sm:block whitespace-nowrap">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Errors Alert */}
      {formErrors.length > 0 && (
        <div className="bg-red-950/40 border border-red-500/30 text-rose-300 p-4 rounded-xl mb-6 font-sans text-sm">
          <p className="font-semibold mb-2">الرجاء التحقق من الحقول التالية:</p>
          <ul className="list-disc list-inside space-y-1 pr-2">
            {formErrors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Steps contents inside elegant white card */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100 min-h-[380px] flex flex-col justify-between">
        <div className="flex-1">
          {/* STEP 1: CONTACT INFO */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-lg md:text-xl font-heading text-slate-800 border-r-4 border-[#c5a059] pr-3 mb-6">
                معلومات طالب الزفة والتواصل
              </h2>
              <p className="text-slate-500 text-xs md:text-sm font-sans mb-4">
                يرجى تزويدنا ببيانات دقيقة ليتمكن منسق استوديو زفاتي من التواصل معكم عبر الواتساب لتأكيد تفاصيل النطق للأسماء ومشاركتكم بروفات الأغنية قبل التسليم النهائي.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block" htmlFor="buyer_name_input">
                    الاسم الثنائي لمقدم الطلب <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      id="buyer_name_input"
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="مثال: صالح العتيبي"
                      className="w-full pl-4 pr-11 py-3 bg-slate-50 border border-slate-205 rounded-xl focus:border-[#c5a059] focus:bg-white outline-none font-sans text-sm transition-all text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block" htmlFor="buyer_phone_input">
                    رقم الجوال (الواتساب ومتابعة الطلب) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      id="buyer_phone_input"
                      type="tel"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="مثال: 05XXXXXXXX"
                      className="w-full pl-4 pr-11 py-3 bg-slate-50 border border-slate-205 rounded-xl focus:border-[#c5a059] focus:bg-white outline-none font-sans text-sm transition-all text-slate-800 text-right dir-ltr"
                    />
                  </div>
                  <span className="text-slate-400 text-xs block">سيتم تسليم الملفات النهائية والبروفات كمقاطع صوتية عالية الجودة عبر هذا الرقم.</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: COUPLE NAMES */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-lg md:text-xl font-heading text-slate-800 border-r-4 border-[#c5a059] pr-3 mb-6">
                تفاصيل العروسين وموعد الحفل
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
                <div className="space-y-2 col-span-1">
                  <label className="text-sm font-semibold text-slate-700 block" htmlFor="bride_name_input">
                    اسم العروس <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="bride_name_input"
                    type="text"
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    placeholder="مثال: حصة، مها، نورة"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-205 rounded-xl focus:border-[#c5a059] focus:bg-white outline-none font-sans text-sm transition-all text-slate-800"
                  />
                  <span className="text-xs text-slate-404 block">اكتب الاسم كما ينطق في كوشة العروس.</span>
                </div>

                <div className="space-y-2 col-span-1">
                  <label className="text-sm font-semibold text-slate-700 block" htmlFor="groom_name_input">
                    اسم العريس <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="groom_name_input"
                    type="text"
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                    placeholder="مثال: خالد، فهد، عبدالرحمن"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-205 rounded-xl focus:border-[#c5a059] focus:bg-white outline-none font-sans text-sm transition-all text-slate-800"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700 block" htmlFor="wedding_date_input">
                    تاريخ المناسبة / الفرح <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      id="wedding_date_input"
                      type="date"
                      value={weddingDate}
                      onChange={(e) => setWeddingDate(e.target.value)}
                      className="w-full pl-4 pr-11 py-3 bg-slate-50 border border-slate-205 rounded-xl focus:border-[#c5a059] focus:bg-white outline-none font-sans text-sm transition-all text-slate-800"
                    />
                  </div>
                  <span className="text-xs text-slate-404 block">نحتاج التاريخ حتى يسلم طلبك بحد أقصى قبل الفرح بأسبوع كامل ليتم الفحص والبروفة بقاعة المناسبة.</span>
                </div>
              </div>

              {/* Generative Poem Section (Simulation) */}
              <div className="bg-[#fdfcfb] p-5 rounded-xl border border-[#c5a059]/20">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#b4904d]" />
                    <h3 className="font-heading text-sm md:text-base font-semibold text-slate-800">
                      هل ترغب في صياغة قصيدة إلكترونية ذكية ترحيبية خاصة؟
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleGeneratePoemMock}
                    disabled={isGeneratingPoem}
                    className="bg-[#c5a059] hover:bg-[#b4904d] text-white font-semibold text-xs px-4 py-2 rounded-full flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
                  >
                    {isGeneratingPoem ? 'جاري الصياغة...' : 'صمم قصيدة الأسماء'}
                  </button>
                </div>
                
                {aiPoemGenerated ? (
                  <div className="bg-white p-4 rounded-lg border border-[#c5a059]/15 font-heading text-slate-700 text-sm leading-relaxed text-center whitespace-pre-line relative">
                    <div className="text-xs text-[#c5a059] mb-2 font-mono">القصيدة الذهبية المقترحة:</div>
                    {aiPoemGenerated}
                    <button 
                      type="button"
                      onClick={() => setAiPoemGenerated('')}
                      className="absolute top-2 left-2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      حذف
                    </button>
                  </div>
                ) : (
                  <p className="text-slate-500 text-xs font-sans leading-relaxed">
                    سيقوم الاستودیو بتحوير أبيات ترحيبية كلاسيكية فخمة بأسماء عائلة العريس والعروس كافتتاحية رائعة قبل السحب الموسيقي. جرب أداة تصميم الأبيات الذكية مجانًا لتضمينها في الطلب!
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 3: PERFORMER & SYSTEM */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-lg md:text-xl font-heading text-slate-800 border-r-4 border-[#c5a059] pr-3 mb-6">
                اختيار المؤدي، الفن واللحن الموسيقي
              </h2>

              {/* Performer list */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 block">
                  الصوت المطلوب للغناء (الفنان المؤدّي)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FAMOUS_SINGERS.map((singer) => (
                    <div
                      key={singer.id}
                      onClick={() => setSingerId(singer.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                        singerId === singer.id
                          ? 'border-[#c5a059] bg-slate-50/80 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{singer.name}</p>
                        <p className="text-xs text-slate-400 mt-1">تؤدى بمحاكاة صوتية متطورة وفلاتر احترافية</p>
                      </div>
                      <div className="text-left flex flex-col items-end">
                        {singer.priceOffset > 0 ? (
                          <span className="text-xs font-semibold text-[#c5a059] block">+{singer.priceOffset} ر.س</span>
                        ) : (
                          <span className="text-xs text-green-600 font-semibold block">مشمول بالأساس</span>
                        )}
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-2 ${
                          singerId === singer.id ? 'border-[#c5a059] bg-[#c5a059]' : 'border-slate-300'
                        }`}>
                          {singerId === singer.id && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rhythm selection */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <label className="text-sm font-semibold text-slate-700 block">
                  نوع الإيقاع واللحن الصوتي للمناسبة
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'with-music',
                      title: 'موسيقى كاملة (دوزان غربي وشرقي)',
                      desc: 'توزيع كامل غني بالآلات الموسيقية كالأورج، البيانو، العود والأوتار.'
                    },
                    {
                      id: 'vocals-defs',
                      title: 'إيقاع الدفوف والطبول المأثورة',
                      desc: 'بدون آلات وترية أو غربية. تعتمد بالكامل فرقة الدف المبهجة لإحياء الأناشيد الشبه مذهلة.'
                    },
                    {
                      id: 'vocals-only',
                      title: 'أكابيلا ومؤثرات صوتية هادئة',
                      desc: 'أصوات المغنين والمرددين المحترفين مع تحسين نغمات الصدى والمؤثرات بجمالية فائقة.'
                    }
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setTrackType(item.id as any)}
                      className={`p-4 rounded-xl border cursor-pointer text-right transition-all flex flex-col justify-between ${
                        trackType === item.id
                          ? 'border-[#c5a059] bg-slate-50/80 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                      }`}
                    >
                      <div>
                        <h4 className="text-xs md:text-sm font-semibold text-slate-800">{item.title}</h4>
                        <p className="text-slate-500 text-[11px] leading-relaxed mt-1">{item.desc}</p>
                      </div>
                      <div className="flex justify-end mt-4">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          trackType === item.id ? 'border-[#c5a059] bg-[#c5a059]' : 'border-slate-300'
                        }`}>
                          {trackType === item.id && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional custom elements */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={additionalPoetry}
                    onChange={(e) => setAdditionalPoetry(e.target.checked)}
                    className="accent-[#c5a059] mt-1 cursor-pointer w-4 h-4 bg-slate-550"
                  />
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block">تضمين إلقاء شعر ترحيبي مخصص بالأسماء (+300 ر.س)</span>
                    <span className="text-slate-400 text-xs block leading-relaxed mt-0.5">
                      يتم صياغة وإلقاء قصيدة من 5 أبيات بصوت جهوري مهيب قبل بداية الأغنية للعروسة أو العريس لرفع مكانة الترحيب بضيوفكم.
                    </span>
                  </div>
                </label>
              </div>
            </motion.div>
          )}

          {/* STEP 4: REVIEW & SUBMIT */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-lg md:text-xl font-heading text-slate-800 border-r-4 border-[#c5a059] pr-3 mb-6">
                مراجعة بيانات تفصيل الزفة
              </h2>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 divide-y divide-slate-100 text-sm space-y-4">
                <div className="grid grid-cols-2 gap-4 pb-3">
                  <div>
                    <span className="text-slate-400 text-xs block mb-1">صاحب الطلب:</span>
                    <span className="text-slate-800 font-semibold">{buyerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block mb-1">رقم الجوال:</span>
                    <span className="text-slate-800 font-sans font-semibold text-right block dir-ltr">{buyerPhone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-3">
                  <div>
                    <span className="text-slate-400 text-xs block mb-1">اسم العروس:</span>
                    <span className="text-slate-800 font-heading font-medium">{brideName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block mb-1">اسم العريس:</span>
                    <span className="text-slate-800 font-heading font-medium">{groomName}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-3">
                  <div>
                    <span className="text-slate-400 text-xs block mb-1">شكل الإيقاع الموسيقي:</span>
                    <span className="text-[#c5a059] font-semibold text-xs leading-normal block">
                      {trackType === 'with-music' ? 'موسيقى كاملة بالآلات والألحان' : trackType === 'vocals-defs' ? 'إيقاع الدفوف الإسلامية الحماسية' : 'أكابيلا وصدى صوتي نقي فقط'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block mb-1">موعد ليلة العمر:</span>
                    <span className="text-slate-800 font-sans font-semibold">{weddingDate}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 py-3">
                  <div>
                    <span className="text-slate-400 text-xs block mb-1">الفنان المختار للغناء:</span>
                    <span className="text-slate-800 font-semibold">{FAMOUS_SINGERS.find(s => s.id === singerId)?.name}</span>
                  </div>
                </div>

                {aiPoemGenerated && (
                  <div className="py-3">
                    <span className="text-slate-400 text-xs block mb-2">أبيات الشعر الترحيبي المطلوبة:</span>
                    <p className="bg-[#fdfcfb] border border-[#c5a059]/10 rounded-lg p-3 font-heading text-xs text-slate-700 text-center leading-relaxed whitespace-pre-line">
                      {aiPoemGenerated}
                    </p>
                  </div>
                )}
              </div>

              {/* Special Instructions */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block" htmlFor="customizer_notes">
                  ملاحظات أو توصيات إضافية للمهندس والمنشد
                </label>
                <textarea
                  id="customizer_notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="إذا رغبت في نطق الأسماء بأسلوب معين، أو إضافة تحية خاصة للأهل، يرجى كتابتها هنا بالتفصيل."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-205 rounded-xl focus:border-[#c5a059] focus:bg-white outline-none font-sans text-sm h-24 resize-none transition-all text-slate-800"
                />
              </div>

              <div className="bg-sky-50 border border-sky-200/50 rounded-xl p-4 flex gap-3 text-sky-800 text-xs">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-sky-500 mt-0.5" />
                <p className="leading-relaxed font-sans">
                  <strong>ضمان استوديو زفاتي:</strong> التعديل بروفات اللحن والأسماء مجاني تمامًا وغير محدود حتى تصل الأغنية للشكل المثالي المرضي لكم بنسبة 100% تمهيداً لليلة زواجكم الميمون.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Wizard Controls Footer */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer"
              >
                السابق
              </button>
            )}
          </div>
          <div>
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-slate-900 hover:bg-black text-white font-semibold text-sm px-8 py-3 rounded-xl transition-colors cursor-pointer"
              >
                المتابعة للخطوة التالية
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#c5a059] to-[#b4904d] text-white hover:brightness-110 font-semibold text-sm px-10 py-3 rounded-full shadow-lg shadow-[#c5a059]/20 flex items-center gap-2 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <span>جاري تسجيل طلبك...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 ml-1" />
                    <span>تأكيد الطلب وحفظ الفاتورة</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
