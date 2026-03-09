export interface MassageService {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  category: string;
  durations: { minutes: number; price: number }[];
  tags?: string[];
  image: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
}

export const categories: ServiceCategory[] = [
  { id: 'klassisch', name: 'Klassische Massagen', icon: '💆' },
  { id: 'wellness', name: 'Wellness', icon: '🌿' },
  { id: 'therapeutisch', name: 'Therapeutisch', icon: '🩺' },
  { id: 'speziell', name: 'Spezialmassagen', icon: '✨' },
];

export const services: MassageService[] = [
  {
    id: 'klassische-massage',
    name: 'Klassische Massage',
    description: 'Gezielte Behandlung des Bewegungsapparates und der Muskulatur zur Lösung von Verspannungen.',
    longDescription: 'Die klassische Massage zielt auf den Bewegungsapparat und die Muskulatur ab. Mit verschiedenen Grifftechniken werden Verspannungen gelöst, die Durchblutung angeregt und das allgemeine Wohlbefinden verbessert. Sie ist die Grundlage aller Massagetechniken und besonders wirksam bei Rücken-, Nacken- und Schulterbeschwerden.',
    icon: '💆',
    category: 'klassisch',
    durations: [
      { minutes: 25, price: 32 },
      { minutes: 50, price: 58 },
    ],
    tags: ['beliebt'],
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&h=400&fit=crop',
  },
  {
    id: 'lymphdrainage',
    name: 'Lymphdrainage',
    description: 'Sanfte Massagetechnik zur Entschlackung, Entwässerung und Stärkung des Immunsystems.',
    longDescription: 'Die Lymphdrainage ist eine sehr sanfte Massagetechnik, die für therapeutische als auch für kosmetische Behandlungen eingesetzt wird. Sie fördert die Entschlackung und Entwässerung des Körpers und erzeugt damit eine allgemeine Regeneration und Stärkung des Immunsystems. Sie wird auch mit Erfolg bei der Behandlung von Ödemen und Narben nach Operationen, bei Rheumatismus, Migräne und im sportmedizinischen Bereich angewendet.',
    icon: '🫧',
    category: 'therapeutisch',
    durations: [
      { minutes: 30, price: 36 },
      { minutes: 50, price: 60 },
    ],
    tags: ['therapeutisch'],
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=400&fit=crop',
  },
  {
    id: 'kinesio-taping',
    name: 'Kinesio-Taping',
    description: 'Elastische Tapes zur Unterstützung der Beweglichkeit und Aktivierung der Selbstheilungskräfte.',
    longDescription: 'Elastische Tapes werden professionell an den betroffenen Stellen aufgebracht. Das Tape unterstützt die Beweglichkeit, erhält sie aufrecht und aktiviert die Selbstheilungskräfte des Körpers. Es wird bei Sportverletzungen, Muskelbeschwerden und zur Haltungskorrektur eingesetzt.',
    icon: '🩹',
    category: 'therapeutisch',
    durations: [
      { minutes: 20, price: 28 },
    ],
    tags: [],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
  },
  {
    id: 'kraeuterstempel',
    name: 'Kräuterstempelmassage',
    description: 'Traditionelle ostasiatische Massage mit heißem Öl und duftenden Kräuterstempeln.',
    longDescription: 'Die Kräuterstempelmassage beruht auf uralten Traditionen der ostasiatischen Massagekunst. Mit heißem Öl und duftenden Kräuterstempeln erleben Körper, Geist und Sinne ein ganzheitliches Wohlfühlerlebnis. Die warmen Kräuterstempel setzen ätherische Öle frei, die über die Haut aufgenommen werden und eine tiefe Entspannung bewirken.',
    icon: '🌿',
    category: 'wellness',
    durations: [
      { minutes: 50, price: 68 },
      { minutes: 80, price: 95 },
    ],
    tags: ['beliebt'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop',
  },
  {
    id: 'hot-stone',
    name: 'Hot Stone Massage',
    description: 'Massage mit heißen hawaiianischen Steinen für tiefe Entspannung von Körper und Seele.',
    longDescription: 'Die Hot Stone Massage ist eine Massage mit heißen hawaiianischen Steinen. Die Wärme der Steine dringt tief in die Muskulatur ein, löst Verspannungen und sorgt für eine tiefe Entspannung von Körper und Seele. Die Kombination aus Wärme und Massage verbessert die Durchblutung und fördert den Stoffwechsel.',
    icon: '🪨',
    category: 'wellness',
    durations: [
      { minutes: 50, price: 65 },
      { minutes: 80, price: 92 },
    ],
    tags: ['beliebt'],
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&h=400&fit=crop',
  },
  {
    id: 'schroepfmassage',
    name: 'Schröpfmassage',
    description: 'Über 3.000 Jahre alte Technik mit Glasglocken zur Verbesserung der Durchblutung.',
    longDescription: 'Die Schröpfmassage ist eine über 3.000 Jahre alte Technik. Glasglocken werden auf eingeölte Haut aufgesetzt und erzeugen durch Unterdruck eine durchblutungsfördernde Wirkung. Diese Massage regt den Lymphfluss an, löst Verklebungen im Bindegewebe und kann bei chronischen Schmerzen lindernd wirken.',
    icon: '🫙',
    category: 'speziell',
    durations: [
      { minutes: 30, price: 38 },
      { minutes: 50, price: 62 },
    ],
    tags: [],
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=600&h=400&fit=crop',
  },
  {
    id: 'schwangerschaftsmassage',
    name: 'Schwangerschaftsmassage',
    description: 'Speziell abgestimmte Massage zur Unterstützung in der Schwangerschaft.',
    longDescription: 'Die Schwangerschaftsmassage bietet speziell auf die Bedürfnisse werdender Mütter abgestimmte Programme. Sie unterstützt den Körper während der Schwangerschaft, lindert typische Beschwerden wie Rückenschmerzen und schwere Beine und fördert die innere Entspannung und das Wohlbefinden.',
    icon: '🤰',
    category: 'speziell',
    durations: [
      { minutes: 30, price: 38 },
      { minutes: 50, price: 62 },
    ],
    tags: [],
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=400&fit=crop',
  },
  {
    id: 'fussreflexzonen',
    name: 'Fußreflexzonenmassage',
    description: 'Gezielte Massage der Reflexzonen der Füße zur ganzheitlichen Behandlung.',
    longDescription: 'Die Reflexzonen der Füße stellen den Körper mit all seinen Organen dar. Über vegetative Abläufe können Irritationen und Schwachstellen erkannt und durch gezielte Massage der entsprechenden Reflexzonen positiv beeinflusst werden. Diese Massage ist eine ganzheitliche Behandlungsmethode, die das Wohlbefinden des gesamten Körpers steigern kann.',
    icon: '🦶',
    category: 'speziell',
    durations: [
      { minutes: 30, price: 36 },
      { minutes: 50, price: 58 },
    ],
    tags: ['beliebt'],
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=600&h=400&fit=crop',
  },
];

export const businessInfo = {
  name: 'Massageinstitut Sabine Schneider',
  shortName: 'Massageinstitut Schneider',
  owner: 'Sabine Schneider',
  company: 'Massageinstitut Sabine Schneider OG',
  address: {
    street: 'Schwarzottstraße 2a',
    location: 'Moore Stephens Center',
    zip: 'A-2620',
    city: 'Neunkirchen',
    country: 'Österreich',
  },
  phone: '0664 4126412',
  email: 'info@massageschneider.at',
  website: 'https://massageschneider.at',
  founded: 2002,
  openingHours: [
    { day: 'Montag', hours: '09:00 – 13:00 & 14:00 – 19:00' },
    { day: 'Dienstag', hours: '09:00 – 13:00 & 14:00 – 19:00' },
    { day: 'Mittwoch', hours: '14:00 – 19:00' },
    { day: 'Donnerstag', hours: '09:00 – 13:00 & 14:00 – 19:00' },
    { day: 'Freitag', hours: '09:00 – 13:00 & 14:00 – 19:00' },
    { day: 'Samstag', hours: 'geschlossen' },
    { day: 'Sonntag', hours: 'geschlossen' },
  ],
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2680.5!2d16.0783!3d47.7261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476dc94b4e9d7c0d%3A0x0!2sSchwarzottstra%C3%9Fe%202a%2C%202620%20Neunkirchen!5e0!3m2!1sde!2sat!4v1700000000000',
};
