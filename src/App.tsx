/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Track, Order, Review } from './types';
import { DEFAULT_TRACKS, DEFAULT_REVIEWS } from './data/defaultZaffat';
import ZafattiHome from './components/ZafattiHome';
import ZaffaCustomizer from './components/ZaffaCustomizer';
import AdminDashboard from './components/AdminDashboard';
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  // Navigation states: 'home' | 'customizer' | 'admin'
  const [view, setView] = useState<'home' | 'customizer' | 'admin'>('home');

  // Shared Data States with LocalStorage backup
  const [tracks, setTracks] = useState<Track[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Selected track for customizer wizard
  const [selectedTrackForCustomizer, setSelectedTrackForCustomizer] = useState<Track | null>(null);

  // Global Audio Player states
  const [currentTrackPlaying, setCurrentTrackPlaying] = useState<Track | null>(null);
  const [isPlayingGlobal, setIsPlayingGlobal] = useState(false);

  // Load Initial state from LocalStorage or Fallbacks
  useEffect(() => {
    const savedTracks = localStorage.getItem('zafatti_tracks');
    if (savedTracks) {
      setTracks(JSON.parse(savedTracks));
    } else {
      setTracks(DEFAULT_TRACKS);
      localStorage.setItem('zafatti_tracks', JSON.stringify(DEFAULT_TRACKS));
    }

    const savedReviews = localStorage.getItem('zafatti_reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      setReviews(DEFAULT_REVIEWS);
      localStorage.setItem('zafatti_reviews', JSON.stringify(DEFAULT_REVIEWS));
    }

    const savedOrders = localStorage.getItem('zafatti_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Pre-populate with two beautiful simulator orders to show data on admin load
      const initialOrders: Order[] = [
        {
          id: 'ord-34821',
          buyerName: 'أميرة العتيبي',
          buyerPhone: '0501234567',
          brideName: 'أميرة',
          groomName: 'بندر',
          weddingDate: '2026-06-18',
          singerType: 'famous-singer',
          singerName: 'ماجد المهندس (محاكاة صوتية متطورة)',
          trackType: 'with-music',
          additionalPoetry: true,
          notes: 'يرجى التركيز على نطق عائلة العريس (العتيبي) والعروسة بكابينة التوزيع بأسلوب فخم جداً.',
          totalPrice: 2899,
          status: 'completed',
          createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString()
        },
        {
          id: 'ord-81944',
          buyerName: 'سعود الرويلي',
          buyerPhone: '0569876543',
          brideName: 'رهام',
          groomName: 'سعود',
          weddingDate: '2026-07-05',
          singerType: 'studio-vocalist',
          singerName: 'منشدو ومغنو استوديو زفاتي المحترفين',
          trackType: 'vocals-defs',
          additionalPoetry: false,
          notes: 'نريد الإيقاع سريعاً ومبهجاً جداً عبر دفوف خليجية حية، ولا نريد أي نغم جيتار.',
          totalPrice: 949,
          status: 'processing',
          createdAt: new Date().toISOString()
        }
      ];
      setOrders(initialOrders);
      localStorage.setItem('zafatti_orders', JSON.stringify(initialOrders));
    }
  }, []);

  // Sync state changes back to LocalStorage
  const saveTracksToLocalStorage = (updatedTracks: Track[]) => {
    setTracks(updatedTracks);
    localStorage.setItem('zafatti_tracks', JSON.stringify(updatedTracks));
  };

  const saveOrdersToLocalStorage = (updatedOrders: Order[]) => {
    setOrders(updatedOrders);
    localStorage.setItem('zafatti_orders', JSON.stringify(updatedOrders));
  };

  // Tracks Actions (CRUD)
  const handleAddTrack = (newTrack: Track) => {
    const updated = [newTrack, ...tracks];
    saveTracksToLocalStorage(updated);
  };

  const handleUpdateTrack = (updatedTrack: Track) => {
    const updated = tracks.map(t => t.id === updatedTrack.id ? updatedTrack : t);
    saveTracksToLocalStorage(updated);
    
    // Update currently playing if attributes changed
    if (currentTrackPlaying?.id === updatedTrack.id) {
      setCurrentTrackPlaying(updatedTrack);
    }
  };

  const handleDeleteTrack = (id: string) => {
    const updated = tracks.filter(t => t.id !== id);
    saveTracksToLocalStorage(updated);
    
    // Stop playing if deleted
    if (currentTrackPlaying?.id === id) {
      setCurrentTrackPlaying(null);
      setIsPlayingGlobal(false);
    }
  };

  // Orders Actions (CRUD)
  const handleAddNewOrder = (newOrder: Order) => {
    const updated = [newOrder, ...orders];
    saveOrdersToLocalStorage(updated);
    
    // Add a corresponding positive review occasionally or mock a toast
    setView('home');
    alert(`💐 تهانينا لكم! تم حفظ طلب زفتكم الملكية (طلب رقم ${newOrder.id}) بنجاح بقيمة ${newOrder.totalPrice} ر.س. لقد تم إخطار مهندسي استوديو زفاتي وسيقوم منسق الطلبات بمشاركتكم بروفة الصوت على جوالكم ${newOrder.buyerPhone} عبر الواتساب في أقصر وقت!`);
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    saveOrdersToLocalStorage(updated);
  };

  // Global Player Actions
  const handleSelectTrackForPlay = (track: Track) => {
    setCurrentTrackPlaying(track);
    setIsPlayingGlobal(true);
  };

  const handleSkipNext = () => {
    if (!currentTrackPlaying) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrackPlaying.id);
    if (currentIndex !== -1 && currentIndex < tracks.length - 1) {
      setCurrentTrackPlaying(tracks[currentIndex + 1]);
      setIsPlayingGlobal(true);
    }
  };

  const handleSkipPrev = () => {
    if (!currentTrackPlaying) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrackPlaying.id);
    if (currentIndex > 0) {
      setCurrentTrackPlaying(tracks[currentIndex - 1]);
      setIsPlayingGlobal(true);
    }
  };

  return (
    <div id="app-root-container" className="font-sans min-h-screen bg-[#fdfcfb] selection:bg-[#c5a059]/30 selection:text-slate-900">
      {/* Dynamic Views Transition Canvas */}
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div
            key="home-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ZafattiHome
              tracks={tracks}
              onSelectTrackForPlay={handleSelectTrackForPlay}
              currentlyPlayingTrack={currentTrackPlaying}
              isPlayingGlobal={isPlayingGlobal}
              onTogglePlayGlobal={() => setIsPlayingGlobal(!isPlayingGlobal)}
              onNavigateToCustomizer={(track) => {
                setSelectedTrackForCustomizer(track);
                setView('customizer');
              }}
              onNavigateToAdmin={() => setView('admin')}
              reviews={reviews}
            />
          </motion.div>
        )}

        {view === 'customizer' && (
          <motion.div
            key="customizer-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <ZaffaCustomizer
              initialTrack={selectedTrackForCustomizer}
              onOrderSubmitted={handleAddNewOrder}
              onCancel={() => {
                setSelectedTrackForCustomizer(null);
                setView('home');
              }}
            />
          </motion.div>
        )}

        {view === 'admin' && (
          <motion.div
            key="admin-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <AdminDashboard
              tracks={tracks}
              orders={orders}
              onAddTrack={handleAddTrack}
              onUpdateTrack={handleUpdateTrack}
              onDeleteTrack={handleDeleteTrack}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onClose={() => setView('home')}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Global Audio Player Bar */}
      {view !== 'admin' && (
        <AudioPlayer
          currentTrack={currentTrackPlaying}
          isPlaying={isPlayingGlobal}
          onPlayPause={() => setIsPlayingGlobal(!isPlayingGlobal)}
          onClose={() => {
            setCurrentTrackPlaying(null);
            setIsPlayingGlobal(false);
          }}
          onSkipNext={handleSkipNext}
          onSkipPrev={handleSkipPrev}
        />
      )}
    </div>
  );
}
