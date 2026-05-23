/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Track {
  id: string;
  title: string;
  singer: string;
  category: string;
  duration: string;
  audioUrl: string;
  likes: number;
  isPremium: boolean;
  price: number; // in Saudi Riyal (SAR)
  originalArtist?: string; // e.g. "راشد الماجد", "محمد عبده"
}

export interface Order {
  id: string;
  buyerName: string;
  buyerPhone: string;
  brideName: string;
  groomName: string;
  weddingDate: string;
  singerType: string; // "studio-vocalist" | "famous-singer"
  singerName: string;
  trackType: 'with-music' | 'vocals-defs' | 'vocals-only'; // مع موسيقى | دفوف | إيقاع بدون موسيقى
  additionalPoetry: boolean;
  notes: string;
  totalPrice: number;
  status: 'pending' | 'processing' | 'completed' | 'canceled';
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  zaffaTitle: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}
