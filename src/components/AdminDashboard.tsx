/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BarChart3, Music, ShoppingBag, Settings, LayoutGrid, Plus, 
  Trash2, Edit, Check, Eye, ExternalLink, Calendar, User, 
  Search, ArrowLeft, RefreshCw, Smartphone, TrendingUp, DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Track, Order, Category } from '../types';
import { DEFAULT_CATEGORIES } from '../data/defaultZaffat';

interface AdminDashboardProps {
  tracks: Track[];
  orders: Order[];
  onAddTrack: (track: Track) => void;
  onUpdateTrack: (track: Track) => void;
  onDeleteTrack: (id: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onClose: () => void;
}

export default function AdminDashboard({
  tracks,
  orders,
  onAddTrack,
  onUpdateTrack,
  onDeleteTrack,
  onUpdateOrderStatus,
  onClose
}: AdminDashboardProps) {
  // Tabs: 'stats' | 'songs' | 'orders'
  const [activeTab, setActiveTab] = useState<'stats' | 'songs' | 'orders'>('stats');

  // Search query
  const [searchTerm, setSearchTerm] = useState('');

  // Songs forms states
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);

  // Form Fields
  const [trackTitle, setTrackTitle] = useState('');
  const [trackSinger, setTrackSinger] = useState('');
  const [trackCategory, setTrackCategory] = useState('bridal-entry');
  const [trackDuration, setTrackDuration] = useState('05:00');
  const [trackPrice, setTrackPrice] = useState('1200');
  const [trackAudioUrl, setTrackAudioUrl] = useState('');
  const [trackOriginalArtist, setTrackOriginalArtist] = useState('');
  const [trackIsPremium, setTrackIsPremium] = useState(false);

  // Stats summary calculation
  const totalRevenue = orders
    .filter(o => o.status === 'completed' || o.status === 'processing')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const inProductionCount = orders.filter(o => o.status === 'processing').length;
  
  // Submit track form
  const handleSaveTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackTitle.trim() || !trackSinger.trim()) {
      alert('يرجى ملء كافة تفاصيل الزفة الأساسية (العنوان وصوت المغني).');
      return;
    }

    const priceNum = parseFloat(trackPrice) || 999;

    if (editingTrack) {
      // Edit mode
      const updated: Track = {
        ...editingTrack,
        title: trackTitle,
        singer: trackSinger,
        category: trackCategory,
        duration: trackDuration,
        price: priceNum,
        audioUrl: trackAudioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        originalArtist: trackOriginalArtist || undefined,
        isPremium: trackIsPremium
      };
      onUpdateTrack(updated);
      setEditingTrack(null);
    } else {
      // Add mode
      const newTrack: Track = {
        id: 'tr-' + (tracks.length + Math.floor(Math.random() * 1000 + 100)),
        title: trackTitle,
        singer: trackSinger,
        category: trackCategory,
        duration: trackDuration,
        price: priceNum,
        audioUrl: trackAudioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        likes: 0,
        originalArtist: trackOriginalArtist || undefined,
        isPremium: trackIsPremium
      };
      onAddTrack(newTrack);
    }

    // Reset Form
    resetTrackForm();
    setShowAddForm(false);
  };

  const startEditTrack = (track: Track) => {
    setEditingTrack(track);
    setTrackTitle(track.title);
    setTrackSinger(track.singer);
    setTrackCategory(track.category);
    setTrackDuration(track.duration);
    setTrackPrice(track.price.toString());
    setTrackAudioUrl(track.audioUrl);
    setTrackOriginalArtist(track.originalArtist || '');
    setTrackIsPremium(track.isPremium);
    setShowAddForm(true);
  };

  const resetTrackForm = () => {
    setEditingTrack(null);
    setTrackTitle('');
    setTrackSinger('');
    setTrackCategory('bridal-entry');
    setTrackDuration('05:00');
    setTrackPrice('1200');
    setTrackAudioUrl('');
    setTrackOriginalArtist('');
    setTrackIsPremium(false);
  };

  return (
    <div id="admin-panel-container" className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row dir-rtl" dir="rtl">
      
      {/* Sidebar Control Navigation */}
      <aside className="w-full md:w-64 bg-slate-950 border-l border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Admin Header display */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#c5a059] to-[#b4904d] flex items-center justify-center text-white font-bold text-xs">
              لوحة
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm md:text-base text-white">إشراف زفاتي</h2>
              <span className="text-[10px] text-[#c5a059] block font-mono">الوضع المسؤول الفخم</span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            <button
              onClick={() => { setActiveTab('stats'); setShowAddForm(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'stats' 
                  ? 'bg-gradient-to-l from-[#c5a059]/15 to-transparent text-[#c5a059] border-r-4 border-[#c5a059]' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BarChart3 className="w-5 h-5 flex-shrink-0" />
              <span>مؤشرات الأداء والإحصائيات</span>
            </button>

            <button
              onClick={() => { setActiveTab('songs'); setShowAddForm(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'songs' 
                  ? 'bg-gradient-to-l from-[#c5a059]/15 to-transparent text-[#c5a059] border-r-4 border-[#c5a059]' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Music className="w-5 h-5 flex-shrink-0" />
              <span>إدارة ملفات وألحان الزفات</span>
            </button>

            <button
              onClick={() => { setActiveTab('orders'); setShowAddForm(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'orders' 
                  ? 'bg-gradient-to-l from-[#c5a059]/15 to-transparent text-[#c5a059] border-r-4 border-[#c5a059]' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <ShoppingBag className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1 text-right">طلبات وحُجوزات العرسان</span>
              {pendingOrdersCount > 0 && (
                <span className="bg-[#c5a059] text-white font-mono text-xs px-2 py-0.5 rounded-full font-bold">
                  {pendingOrdersCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Exit back button */}
        <div className="pt-6 border-t border-slate-850 mt-8">
          <button
            onClick={onClose}
            className="w-full flex items-center gap-2 justify-center bg-slate-900 hover:bg-slate-820 text-slate-300 py-2.5 rounded-xl text-xs font-sans border border-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>عرض الموقع كعميل</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Working Canvas */}
      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-medium text-white tracking-wide">
              {activeTab === 'stats' && 'نظرة عامة على نشاط المنصة'}
              {activeTab === 'songs' && 'إدارة مكتبة الزفات الصوتية'}
              {activeTab === 'orders' && 'سجل حُجوزات العرسان وتعديل النطق'}
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              {activeTab === 'stats' && 'شاهد إيرادات تفصيل الزفات، حالة طلبات الإنتاج، ونسب المبيعات.'}
              {activeTab === 'songs' && 'تحكم في الألحان المتاحة، عدّل الأسعار التقديرية، أو أضف مقاطع ديمو مسجلة.'}
              {activeTab === 'orders' && 'شاهد تفاصيل العرسان، تواصل عبر الواتساب، وعدل مراحل إنتاج الزفة مجهرياً.'}
            </p>
          </div>

          {/* Quick Refresh Tracker */}
          <div className="text-slate-500 text-xs font-sans flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-full border border-slate-800">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#c5a059]" />
            <span>مزامنة مباشرة مع ذاكرة الأبليكيشن</span>
          </div>
        </div>

        {/* TAB 1: METRICS STATS SUMMARY */}
        {activeTab === 'stats' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Upper stats grid widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/60 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#c5a059]/5 rounded-bl-full transition-transform group-hover:scale-110 pointer-events-none" />
                <span className="text-slate-400 text-xs font-medium block">إجمالي مبيعات الزفات</span>
                <span className="text-2xl md:text-3xl font-mono font-bold text-[#c5a059] block mt-2">{totalRevenue} ر.س</span>
                <div className="flex items-center gap-1.5 text-xs text-green-500 mt-2 font-sans">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>تحديث دوري نشط</span>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/60 shadow-lg relative overflow-hidden group">
                <span className="text-slate-400 text-xs font-medium block">إجمالي طلبات التفصيل</span>
                <span className="text-2xl md:text-3xl font-mono font-bold text-white block mt-2">{orders.length} طلب</span>
                <p className="text-slate-500 text-xs font-sans mt-2">تشمل المعلقة، الجارية، والمنتهية بنجاح</p>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/60 shadow-lg relative overflow-hidden group">
                <span className="text-slate-400 text-xs font-medium block">طلبات بالانتظار (تحتاج توزيع)</span>
                <span className="text-2xl md:text-3xl font-mono font-bold text-[#c5a059] block mt-2">{pendingOrdersCount} طلب</span>
                <p className="text-slate-550 text-xs font-sans mt-2">تنتظر مراجعة النطق وبدء البروفات</p>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/60 shadow-lg relative overflow-hidden group">
                <span className="text-slate-400 text-xs font-medium block">زفات جاري تسجيلها وتلحينها</span>
                <span className="text-2xl md:text-3xl font-mono font-bold text-sky-400 block mt-2">{inProductionCount} طلب</span>
                <p className="text-slate-550 text-xs font-sans mt-2">مفتوحة حالياً في استوديو التسجيل الصوتي</p>
              </div>

            </div>

            {/* Sales visual performance simulator */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category split ratio */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/60 text-right">
                <h3 className="font-heading font-semibold text-sm md:text-base text-white mb-6">مبيعات الزفات حسب تصنيف النغم</h3>
                <div className="space-y-4 font-sans text-xs">
                  {[
                    { name: 'زفات مسار كوشة العروس', count: 12, percent: '55%', color: 'bg-[#c5a059]' },
                    { name: 'زفات الدفوف والمجموعات الإسلامية', count: 6, percent: '28%', color: 'bg-emerald-500' },
                    { name: 'ترحيب شيلات المعرس', count: 3, percent: '12%', color: 'bg-sky-500' },
                    { name: 'إلقاء قصائد بأسماء الأهل', count: 1, percent: '5%', color: 'bg-indigo-400' }
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-slate-400">
                        <span>{item.name} ({item.count} حجز)</span>
                        <span className="font-mono">{item.percent}</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: item.percent }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct recent order listing summary */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/60 text-right">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-heading font-semibold text-sm md:text-base text-white">آخر النشاطات والحُجوزات</h3>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className="text-[#c5a059] font-semibold text-xs font-sans hover:underline flex items-center gap-0.5"
                  >
                    <span>عرض الكل</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {orders.slice(0, 4).map((ord) => (
                    <div key={ord.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800/50 flex justify-between items-center text-xs">
                      <div className="text-right">
                        <span className="font-semibold block text-slate-200">العروس {ord.brideName} & العريس {ord.groomName}</span>
                        <span className="text-[10px] text-slate-500 block">بواسطة: {ord.buyerName} | تاريخ الحفل: {ord.weddingDate}</span>
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-slate-350 block">{ord.totalPrice} ر.س</span>
                        <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full mt-1 ${
                          ord.status === 'completed' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50' :
                          ord.status === 'processing' ? 'bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/30' :
                          ord.status === 'canceled' ? 'bg-rose-950 text-rose-350 border border-rose-850' :
                          'bg-amber-955 text-amber-350 border border-amber-800/30'
                        }`}>
                          {ord.status === 'completed' ? 'تم التسليم والبروفة' :
                           ord.status === 'processing' ? 'في الاستديو لتعديل الأسماء' :
                           ord.status === 'canceled' ? 'ملغي' : 'بانتظار المنسّق'}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {orders.length === 0 && (
                    <p className="text-slate-500 text-xs text-center py-6 font-sans">لا توجد حُجوزات بعد في النظام.</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: SONGS AND MUSIC CATALOG CRUD */}
        {activeTab === 'songs' && (
          <div className="space-y-6">
            {!showAddForm ? (
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/50">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  {/* Search filter within products bar */}
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-550 w-4.5 h-4.5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="ابحث بالنص أو الفئة أو المغني..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-4 pr-11 text-xs outline-none focus:border-[#c5a059] placeholder-slate-500 text-slate-100 text-right font-sans"
                    />
                  </div>

                  {/* Add action */}
                  <button
                    onClick={() => { resetTrackForm(); setShowAddForm(true); }}
                    className="bg-gradient-to-l from-[#c5a059] to-[#b4904d] hover:brightness-110 text-white font-semibold text-xs md:text-sm px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer self-stretch sm:self-auto justify-center"
                  >
                    <Plus className="w-5 h-5 flex-shrink-0" />
                    <span>إضافة زفة/لحن جديد للمكتبة</span>
                  </button>
                </div>

                {/* Tracks list table element */}
                <div className="overflow-x-auto border border-slate-800 rounded-xl">
                  <table className="w-full text-right text-xs md:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold text-xs">
                        <th className="p-4">عنوان الزفة كعنوان رئيسي</th>
                        <th className="p-4">صوت المغني / المنشد</th>
                        <th className="p-4">التصنيف</th>
                        <th className="p-5 text-center">أقل سعر تفصيل</th>
                        <th className="p-4 text-center">نوع النغمة ديمو</th>
                        <th className="p-4 text-center">الإجراءات والتحكم</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {tracks
                        .filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.singer.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((track) => (
                          <tr key={track.id} className="hover:bg-slate-90 w-full transition-colors">
                            <td className="p-4 font-semibold text-white">
                              <span className="flex items-center gap-2">
                                {track.isPremium && (
                                  <span className="bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/35 text-[9px] px-1.5 py-0.5 rounded">ملكي</span>
                                )}
                                {track.title}
                              </span>
                            </td>
                            <td className="p-4 text-slate-300 font-sans">{track.singer}</td>
                            <td className="p-4 font-sans text-xs">
                              <span className="bg-slate-800 px-2.5 py-1 rounded text-slate-400">
                                {DEFAULT_CATEGORIES.find(c => c.id === track.category)?.name || 'موسيقى الأفراح'}
                              </span>
                            </td>
                            <td className="p-5 text-center font-mono font-semibold text-slate-200">{track.price} ر.س</td>
                            <td className="p-4 text-center font-mono text-xs text-slate-400">{track.duration}</td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => startEditTrack(track)}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                  title="تعديل"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`هل أنت متأكد من حذف زفة "${track.title}" نهائياً من العميل؟`)) {
                                      onDeleteTrack(track.id);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 hover:text-red-200 transition-colors cursor-pointer"
                                  title="حذف"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}

                      {tracks.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-500">لا توجد ألحان حالياً.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Add/Edit dynamic track form */
              <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800/60 max-w-3xl mx-auto text-right">
                <h3 className="font-heading font-semibold text-lg md:text-xl text-white mb-6 border-b border-slate-800 pb-3">
                  {editingTrack ? 'تعديل بيانات اللحن الصوتي' : 'إضافة زفة معيارية جديدة للألبوم'}
                </h3>

                <form onSubmit={handleSaveTrack} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300 block" htmlFor="track_title_field">عنوان الزفة أو الشيلة</label>
                      <input
                        id="track_title_field"
                        type="text"
                        value={trackTitle}
                        onChange={(e) => setTrackTitle(e.target.value)}
                        placeholder="مثال: زفة طل كالبدر بنبض المشاعر"
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-[#c5a059] outline-none text-xs text-slate-100"
                        required
                      />
                    </div>

                    {/* Singer */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300 block" htmlFor="track_singer_field">صوت المغني / المنشد بالاستوديو</label>
                      <input
                        id="track_singer_field"
                        type="text"
                        value={trackSinger}
                        onChange={(e) => setTrackSinger(e.target.value)}
                        placeholder="مثال: بصوت منشدو استوديو ليلة العمر"
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-[#c5a059] outline-none text-xs text-slate-100"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300 block" htmlFor="track_category_field">تصنيف النغم الصوتي</label>
                      <select
                        id="track_category_field"
                        value={trackCategory}
                        onChange={(e) => setTrackCategory(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-[#c5a059] outline-none text-xs text-slate-100"
                      >
                        {DEFAULT_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Original artist fallback */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300 block" htmlFor="track_artist_field">اللحن والنمط محاكاة للفنان (اختياري)</label>
                      <input
                        id="track_artist_field"
                        type="text"
                        value={trackOriginalArtist}
                        onChange={(e) => setTrackOriginalArtist(e.target.value)}
                        placeholder="مثال: راشد الماجد، محمد عبده"
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-[#c5a059] outline-none text-xs text-slate-100"
                      />
                    </div>

                    {/* Price in Saudi */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300 block" htmlFor="track_price_field">أقل سعر تفصيل بالأسماء (ر.س)</label>
                      <input
                        id="track_price_field"
                        type="number"
                        value={trackPrice}
                        onChange={(e) => setTrackPrice(e.target.value)}
                        placeholder="1199"
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-[#c5a059] outline-none text-xs text-slate-100"
                        required
                      />
                    </div>

                    {/* Duration string */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300 block" htmlFor="track_duration_field">مدة المقطع ديمو (صوت نغمي)</label>
                      <input
                        id="track_duration_field"
                        type="text"
                        value={trackDuration}
                        onChange={(e) => setTrackDuration(e.target.value)}
                        placeholder="مثال: 05:12"
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-[#c5a059] outline-none text-xs text-slate-100"
                      />
                    </div>

                    {/* Audio Url snippet */}
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-300 block" htmlFor="track_audio_field">رابط ملف الصوت ديمو MP3 المصاحب</label>
                      <input
                        id="track_audio_field"
                        type="url"
                        value={trackAudioUrl}
                        onChange={(e) => setTrackAudioUrl(e.target.value)}
                        placeholder="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-[#c5a059] outline-none text-xs text-slate-100 font-sans"
                      />
                      <span className="text-slate-500 text-[10px] block">سوف يتم تشغيل هذا الرابط الصوتي عند كليك العميل على زر الاستماع بساحة الموقع.</span>
                    </div>

                    {/* Is absolute premium checkbox */}
                    <div className="sm:col-span-2 flex items-center gap-3 py-2">
                      <input
                        type="checkbox"
                        checked={trackIsPremium}
                        onChange={(e) => setTrackIsPremium(e.target.checked)}
                        className="accent-[#c5a059] cursor-pointer w-4 h-4"
                        id="is_premium_checkbox"
                      />
                      <label htmlFor="is_premium_checkbox" className="text-xs font-medium text-slate-350 cursor-pointer select-none">
                        تصنيف هذه الأغنية كـ (عمل ملكي لحن حصري) لإظهار شارة ذهبية براقة للعميل.
                      </label>
                    </div>

                  </div>

                  {/* Buttons controller of track manager */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => { setShowAddForm(false); resetTrackForm(); }}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs py-2.5 px-5 rounded-xl transition-colors cursor-pointer"
                    >
                      إلغاء التعديل
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-l from-[#c5a059] to-[#b4904d] text-white font-semibold text-xs py-2.5 px-6 rounded-xl transition-transform hover:scale-105 cursor-pointer"
                    >
                      {editingTrack ? 'حفظ تعديلات اللحن' : 'إدراج اللحن للعملاء'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CUSTOM ORDERS LOGS (BRIDAL SCHEDULER) */}
        {activeTab === 'orders' && (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/60 text-right animate-fadeIn">
            <h3 className="font-heading font-semibold text-sm md:text-base text-white mb-6 border-b border-slate-800 pb-3 flex justify-between items-center">
              <span>جميع طلبات تنفيذ الزفات الجارية</span>
              <span className="bg-slate-900 border border-slate-850 text-slate-400 font-mono text-xs px-2.5 py-1 rounded">
                إجمالي الدفتر: {orders.length} طلبات
              </span>
            </h3>

            {orders.length === 0 ? (
              <p className="text-slate-500 text-xs py-12 text-center font-sans">بانتظار تلقي طلبات زفت جديدة بالأسماء من صفحة المتجر.</p>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800/80 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
                  >
                    {/* Section grid order data info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1 text-xs">
                      <div>
                        <span className="text-slate-505 text-[10px] block mb-0.5">معرف الحجز والفاتورة:</span>
                        <span className="font-mono font-semibold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {order.id}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-505 text-[10px] block mb-0.5">اسم العميل ورقم الفرح:</span>
                        <span className="font-semibold text-slate-300 block">{order.buyerName}</span>
                        <a 
                          href={`https://wa.me/${order.buyerPhone.replace(/\s+/g, '')}?text=مرحباً ${order.buyerName} معك استوديو زفاتي لمتابعة تفاصيل النطق للعروسين ${order.brideName} و ${order.groomName}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#c5a059] hover:underline font-mono text-[11px] block mt-1 leading-none text-right dir-ltr"
                        >
                          ☎️ {order.buyerPhone} (واتساب مباشر)
                        </a>
                      </div>

                      <div>
                        <span className="text-slate-505 text-[10px] block mb-0.5">أسماء العروسين لليلة الفرح:</span>
                        <span className="font-semibold text-[#c5a059] font-heading block">
                          👰 {order.brideName} & 🤵 {order.groomName}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-505 text-[10px] block mb-0.5">تاريخ حفل الزفاف الزمني:</span>
                        <span className="text-slate-300 font-sans font-semibold flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span>{order.weddingDate}</span>
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-505 text-[10px] block mb-0.5">صوت المغني ونوع الإيقاع:</span>
                        <span className="text-slate-300 block font-semibold">{order.singerName}</span>
                        <span className="text-slate-400 text-[10px] block mt-0.5">
                          {order.trackType === 'with-music' ? 'مع سحب موسيقي كامل' : order.trackType === 'vocals-defs' ? 'عبر إيقاع الدفوف' : 'مؤثرات أكابيلا صدى فقط'}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-505 text-[10px] block mb-0.5">التكلفة والرسوم المدفوعة:</span>
                        <span className="font-bold text-[#c5a059] font-mono text-sm block">{order.totalPrice} ر.س</span>
                      </div>
                    </div>

                    {/* Section details instructions */}
                    <div className="w-full lg:max-w-xs bg-slate-950 p-3 rounded-lg border border-slate-850 text-[11px] text-slate-400 leading-relaxed max-h-24 overflow-y-auto">
                      <span className="text-slate-500 text-[10px] block mb-1">تعليمات وتفاصيل التعديل الفردية:</span>
                      {order.notes || 'لا توجد متطلبات أو توصيات إضافية بالطلب.'}
                    </div>

                    {/* Controllers statuses block of order */}
                    <div className="flex flex-col items-stretch sm:items-end gap-2 shrink-0 w-full sm:w-auto">
                      <span className="text-slate-550 text-[10px] block text-right sm:text-left mb-1">تعديل مرحلة ووضع الطلب:</span>
                      <div className="flex flex-wrap sm:flex-nowrap gap-1">
                        {[
                          { id: 'pending', label: 'بالانتظار', color: 'hover:bg-[#c5a059] hover:text-white border-[#c5a059]/30 text-[#c5a059] bg-[#c5a059]/10' },
                          { id: 'processing', label: 'بالاستديو جاري', color: 'hover:bg-sky-500 hover:text-black border-sky-850 text-sky-400 bg-sky-950/20' },
                          { id: 'completed', label: 'سُلّم للعروسة', color: 'hover:bg-emerald-600 hover:text-white border-emerald-800 text-emerald-400 bg-emerald-950/20' },
                          { id: 'canceled', label: 'إلغاء', color: 'hover:bg-rose-600 hover:text-white border-rose-800 text-rose-400 bg-rose-950/20' }
                        ].map((btn) => (
                          <button
                            key={btn.id}
                            type="button"
                            onClick={() => onUpdateOrderStatus(order.id, btn.id as any)}
                            className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
                              order.status === btn.id
                                ? btn.id === 'completed' ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-500' :
                                  btn.id === 'processing' ? 'bg-sky-550 text-slate-950 font-bold border-sky-500' :
                                  btn.id === 'canceled' ? 'bg-rose-600 text-white font-bold border-rose-600' :
                                  'bg-[#c5a059] text-white font-bold border-[#c5a059]'
                                : btn.color
                            }`}
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
