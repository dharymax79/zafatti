/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Heart, X, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Track } from '../types';

interface AudioPlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onClose: () => void;
  onSkipNext?: () => void;
  onSkipPrev?: () => void;
}

export default function AudioPlayer({
  currentTrack,
  isPlaying,
  onPlayPause,
  onClose,
  onSkipNext,
  onSkipPrev
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Synchronize audio element play state with isPlaying prop
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn("Audio playback interrupted/error:", err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  // Set source change
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn("Audio autoplay on track change failed:", err);
        });
      }
    }
    // Reset liked state for new track
    setIsLiked(false);
  }, [currentTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    if (onSkipNext) {
      onSkipNext();
    } else {
      onPlayPause();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      audioRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const nextMute = !isMuted;
      setIsMuted(nextMute);
      audioRef.current.muted = nextMute;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentTrack) return null;

  return (
    <div id="audio-player-root">
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
      />
      
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-[#c5a059]/30 text-white shadow-[0_-10px_25px_rgba(0,0,0,0.5)] px-4 py-3 md:py-4 dir-rtl"
          dir="rtl"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Part 1: Track Details */}
            <div className="flex items-center gap-3 w-full md:w-1/3 justify-between md:justify-start">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 bg-gradient-to-tr from-[#b4904d] to-[#c5a059] rounded-lg flex items-center justify-center shadow-lg border border-[#c5a059]/20 flex-shrink-0">
                  {isPlaying ? (
                    <div className="flex items-end gap-0.5 h-6">
                      <motion.span animate={{ height: [4, 20, 4] }} transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }} className="w-1 bg-white rounded-full" />
                      <motion.span animate={{ height: [8, 24, 8] }} transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }} className="w-1 bg-white rounded-full" />
                      <motion.span animate={{ height: [6, 16, 6] }} transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }} className="w-1 bg-white rounded-full" />
                      <motion.span animate={{ height: [4, 18, 4] }} transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }} className="w-1 bg-white rounded-full" />
                    </div>
                  ) : (
                    <Music className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="text-right">
                  <h4 className="font-heading font-medium text-sm md:text-base text-white line-clamp-1">
                    {currentTrack.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    {currentTrack.singer} 
                    {currentTrack.originalArtist && <span className="text-[#c5a059] mr-2">({currentTrack.originalArtist})</span>}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mr-3 md:mr-6">
                <button 
                  onClick={() => setIsLiked(!isLiked)} 
                  className={`p-2 rounded-full hover:bg-slate-800 transition-colors ${isLiked ? 'text-red-500' : 'text-slate-400 hover:text-white'}`}
                  title="أعجبني"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>
            </div>

            {/* Part 2: Center Controls & Seek Bar */}
            <div className="flex flex-col items-center gap-2 w-full md:w-1/3">
              {/* Button controllers */}
              <div className="flex items-center gap-6">
                <button
                  onClick={onSkipPrev}
                  disabled={!onSkipPrev}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  title="الزفة السابقة"
                >
                  <SkipBack className="w-5 h-5 transform rotate-180" />
                </button>

                <button
                  onClick={onPlayPause}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-[#c5a059] to-[#b4904d] hover:brightness-110 text-slate-900 flex items-center justify-center shadow-md transform hover:scale-105 active:scale-95 transition-all"
                  title={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current text-slate-900" />
                  ) : (
                    <Play className="w-6 h-6 fill-current text-slate-900 translate-x-[-1px]" />
                  )}
                </button>

                <button
                  onClick={onSkipNext}
                  disabled={!onSkipNext}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  title="الزفة التالية"
                >
                  <SkipForward className="w-5 h-5 transform rotate-180" />
                </button>
              </div>

              {/* Progress slider */}
              <div className="flex items-center gap-2 w-full text-xs text-slate-400 font-mono">
                <span className="w-9 text-left">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full accent-[#c5a059] bg-slate-700 h-1 rounded-lg cursor-pointer hover:h-1.5 transition-all"
                />
                <span className="w-9 text-right">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Part 3: Volume & Actions */}
            <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-1/3">
              {/* Volume */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="text-slate-400 hover:text-white transition-colors p-1"
                  title={isMuted ? "إلغاء الكتم" : "كتم الصوت"}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 md:w-24 accent-[#c5a059] bg-slate-700 h-1 rounded-lg cursor-pointer"
                />
              </div>

              {/* Action and Close */}
              <div className="flex items-center gap-2">
                <span className="hidden lg:inline bg-[#c5a059]/10 text-[#c5a059] px-2.5 py-1 rounded text-xs border border-[#c5a059]/20">
                  {currentTrack.price} ر.س
                </span>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="أغلق المشغل"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
