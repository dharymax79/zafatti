/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Track, Category, Review } from '../types';

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'all',
    name: 'جميع التصنيفات',
    description: 'استكشف كافة الزفات والمقطوعات الموسيقية المتاحة'
  },
  {
    id: 'bridal-entry',
    name: 'زفات مسار العروس',
    description: 'موسيقى فخمة لترافق العروس عند دخولها قاعة الفرح بخطى ملكية'
  },
  {
    id: 'vocals-only',
    name: 'زفات بدون موسيقى (بالدفوف)',
    description: 'زفات وموشحات مخصصة تؤدى بالدفوف والإيقاعات الشرقية الأصيلة فقط'
  },
  {
    id: 'groom',
    name: 'زفات المعرس والترحيب',
    description: 'أجمل الأغاني شيلات وزفات لدخول العريس واستقبال المهنئين'
  },
  {
    id: 'poetry-intro',
    name: 'قصائد ترحيبية وشعر',
    description: 'مقدمات شعرية بأعذب الأصوات تسبق زفة العروس لتعطي هيبة وقيمة للمناسبة'
  },
  {
    id: 'graduation-newborn',
    name: 'حفلات ومناسبات خاصة',
    description: 'أغاني وزفات للتخرج، المواليد، وأعياد الميلاد وتكريم الناجحين'
  }
];

export const DEFAULT_TRACKS: Track[] = [
  {
    id: 'tr-1',
    title: 'زفة طلّة البدر الملكية',
    singer: 'بصوت فريق استوديو زفاتي',
    category: 'bridal-entry',
    duration: '06:12',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    likes: 342,
    isPremium: true,
    price: 1199,
    originalArtist: 'راشد الماجد'
  },
  {
    id: 'tr-2',
    title: 'زفة تاج العرائس والجمال',
    singer: 'بصوت الفنان ماجد المهندس (محاكاة)',
    category: 'bridal-entry',
    duration: '05:45',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    likes: 219,
    isPremium: true,
    price: 1899,
    originalArtist: 'ماجد المهندس'
  },
  {
    id: 'tr-3',
    title: 'شيلة هيبة حضورك (بدون موسيقى - بالدف الخليجي)',
    singer: 'أداء المنشد بدر العزي (محاكاة)',
    category: 'vocals-only',
    duration: '04:30',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    likes: 512,
    isPremium: false,
    price: 799
  },
  {
    id: 'tr-4',
    title: 'زفة ملك الفرح والشهامة (خاصة بالمعرس)',
    singer: 'صوت المنشد فهد بن فصلا (محاكاة)',
    category: 'groom',
    duration: '05:10',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    likes: 188,
    isPremium: false,
    price: 699
  },
  {
    id: 'tr-5',
    title: 'مقدمة شعرية - خجلة الورد في ليلة زفافها',
    singer: 'أداء صوتي وإلقاء من فضة النحاس',
    category: 'poetry-intro',
    duration: '02:40',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    likes: 95,
    isPremium: true,
    price: 499
  },
  {
    id: 'tr-6',
    title: 'زفة ليلة العمر يزهى بها الحسن والود',
    singer: 'بصوت الجسمي ومحمد عبده دويت (محاكاة ديمو)',
    category: 'bridal-entry',
    duration: '07:20',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    likes: 428,
    isPremium: true,
    price: 2499,
    originalArtist: 'حسين الجسمي'
  },
  {
    id: 'tr-7',
    title: 'شيلة تخرج - جنينا ثمار السنين',
    singer: 'بأصوات نخبة من منشدي الخليج',
    category: 'graduation-newborn',
    duration: '03:55',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    likes: 278,
    isPremium: false,
    price: 550
  },
  {
    id: 'tr-8',
    title: 'زفة أقبلت والكون كله يناديلها (دفوف حماسية كاملة)',
    singer: 'كتاكيت الاستوديو بالدفوف السريعة',
    category: 'vocals-only',
    duration: '05:02',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    likes: 164,
    isPremium: false,
    price: 799
  }
];

export const FAMOUS_SINGERS = [
  { id: 'studio', name: 'منشدو ومغنو استوديو زفاتي المحترفين (خيار موفر)', priceOffset: 0 },
  { id: 'jassmi', name: 'محمد عبده (محاكاة صوتية متطورة)', priceOffset: 1200 },
  { id: 'majid', name: 'ماجد المهندس (محاكاة صوتية متطورة)', priceOffset: 1000 },
  { id: 'rashed', name: 'راشد الماجد (محاكاة صوتية متطورة)', priceOffset: 1100 },
  { id: 'jassmi-real', name: 'حسين الجسمي (محاكاة صوتية متطورة)', priceOffset: 1100 },
  { id: 'badr', name: 'بدر العزي (أداء شيلات مميزة)', priceOffset: 400 }
];

export const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'أميرة العتيبي',
    rating: 5,
    comment: 'الحمد لله زفة طلتي طلعت خرافية، كل ضيوف العرس سألونى من وين سويتها. التعديل بالأسماء كان دقيق والصوت واضح ونقي جداً. الله يسعدكم ويبارك لكم.',
    date: '2026-05-12',
    zaffaTitle: 'زفة طلّة البدر الملكية'
  },
  {
    id: 'rev-2',
    name: 'عبدالله بن فهد',
    rating: 5,
    comment: 'تعامل راقي ودقة في المواعيد. زفة المعرس وسحب الدفوف كانت حماسية جداً وشالت الصالة شيل. الدعم على الواتساب كان سريع ويعدلوا على الملاحظات فوراً.',
    date: '2026-04-29',
    zaffaTitle: 'زفة ملك الفرح والشهامة'
  },
  {
    id: 'rev-3',
    name: 'سارة الدوسري',
    rating: 5,
    comment: 'القصيدة الترحيبية كانت في غاية الرقة والإحساس، ألقت بالأسماء بأسلوب مبهر، فخورة جدا باختياري لموقع زفاتي لإحياء ليلة فرحي!',
    date: '2026-05-01',
    zaffaTitle: 'مقدمة شعرية - خجلة الورد'
  }
];
