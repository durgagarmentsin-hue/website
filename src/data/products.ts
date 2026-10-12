import { Product } from '../types';
import dandiyaFrockImg from '../assets/images/product_garba_dandiya_frock_1791793865878.jpg';
import bandhaniKurtaImg from '../assets/images/product_boys_bandhani_kurta_1791793878751.jpg';
import brocadeKurtaImg from '../assets/images/product_boys_brocade_kurta_1791793889242.jpg';
import kutchiDressImg from '../assets/images/product_girls_kutchi_dress_1791793899293.jpg';
import linenShirtImg from '../assets/images/product_linen_shirt_1791791132430.jpg';
import dressImg from '../assets/images/product_womens_dress_1791791156729.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'dg-cust-01',
    name: 'Girls Dandiya Folk Print Flared Frock Dress',
    category: 'kids',
    subcategory: 'Festive & Annual Day',
    price: 799,
    originalPrice: 1199,
    rating: 4.9,
    reviewsCount: 86,
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: [
      { name: 'Golden Yellow & White', hex: '#eab308' },
      { name: 'Festive Orange', hex: '#ea580c' }
    ],
    fabric: '100% Breathable Fine Cotton',
    fabricDetails: 'Skin-friendly cotton featuring vibrant Garba Dandiya folk dancer border, circular mandala print, matching puff sleeves, and delicate zigzag gota lace hemline.',
    description: 'Perfect for Navratri Garba, school annual day dance performances, fancy dress competitions, and festive family pujas. Pure breathable cotton ensures children stay comfortable all day.',
    careInstructions: [
      'Hand wash cold or gentle cycle',
      'Wash with like colors',
      'Line dry in shade to preserve colors',
      'Warm iron on reverse side'
    ],
    image: dandiyaFrockImg,
    inStock: true,
    stockCount: 25,
    featured: true
  },
  {
    id: 'dg-cust-02',
    name: 'Boys Bandhani Print Festive Kurta & Pyjama Set',
    category: 'kids',
    subcategory: 'Kids Ethnic & Festivals',
    price: 849,
    originalPrice: 1299,
    rating: 4.9,
    reviewsCount: 112,
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
    colors: [
      { name: 'Cherry Red', hex: '#dc2626' },
      { name: 'Emerald Green', hex: '#059669' },
      { name: 'Mustard Yellow', hex: '#d97706' },
      { name: 'Peacock Teal Blue', hex: '#0d9488' }
    ],
    fabric: 'Premium Cotton Bandhani Weave',
    fabricDetails: 'Authentic Rajasthani tie-and-dye bandhani pattern kurta with mandarin collar, front placket buttons, and soft elasticated white cotton pyjama pants. Presented in premium gift box packaging.',
    description: 'Ideal for Diwali, Janmashtami, school cultural events, and weddings. Available in 4 rich festive colors with comfortable breathable pyjama.',
    careInstructions: [
      'First wash separate recommended',
      'Gentle cold hand or machine wash',
      'Do not soak for extended time',
      'Medium iron'
    ],
    image: bandhaniKurtaImg,
    inStock: true,
    stockCount: 30,
    featured: true
  },
  {
    id: 'dg-cust-03',
    name: 'Boys Royal Banarasi Zari Brocade Kurta & Pyjama Set',
    category: 'ethnic',
    subcategory: 'Royal Wedding & Festive',
    price: 999,
    originalPrice: 1499,
    rating: 5.0,
    reviewsCount: 94,
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y', '13-14Y'],
    colors: [
      { name: 'Royal Plum Wine', hex: '#581c87' },
      { name: 'Midnight Navy Blue', hex: '#1e3a8a' },
      { name: 'Peacock Teal Green', hex: '#115e59' }
    ],
    fabric: 'Lustrous Art Silk with Banarasi Golden Zari',
    fabricDetails: 'Rich lustrous jacquard fabric adorned with woven golden zari floral bootis and an ornate broad golden brocade hem border. Includes soft cotton-blend white pyjama.',
    description: 'A majestic regal ensemble for family weddings, festive celebrations, and school mythological/royal character competitions. Includes gift box packaging.',
    careInstructions: [
      'Dry clean recommended for initial wash',
      'Gentle cold wash inside-out',
      'Iron with protective cloth on low-medium heat'
    ],
    image: brocadeKurtaImg,
    inStock: true,
    stockCount: 18,
    featured: true
  },
  {
    id: 'dg-cust-04',
    name: 'Girls Kutchi Mirror-Work & Pom-Pom Kalidar Festive Dress',
    category: 'ethnic',
    subcategory: 'Navratri & School Annual Day',
    price: 949,
    originalPrice: 1399,
    rating: 4.9,
    reviewsCount: 128,
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: [
      { name: 'Multicolor Fiesta', hex: '#f59e0b' },
      { name: 'Rani Pink & Black', hex: '#db2777' }
    ],
    fabric: 'Fine Cotton with Traditional Mirror & Thread Embroidery',
    fabricDetails: 'Vibrant multi-panel kalidar skirt with contrasting yellow, rani pink, black, and white panels. Detailed with authentic reflective Kutchi mirror embroidery, intricate threadwork, and playful waist pom-pom tassels.',
    description: 'Our most celebrated annual day and Dandiya festival outfit. Lightweight, vibrant, and beautifully flared for dancing without discomfort.',
    careInstructions: [
      'Hand wash cold gently to protect mirrors',
      'Do not wring or brush embroidery',
      'Dry in shade',
      'Steam iron from reverse side'
    ],
    image: kutchiDressImg,
    inStock: true,
    stockCount: 22,
    featured: true
  },
  {
    id: 'dg-01',
    name: 'Relaxed Fit Pure Linen Button-Down Shirt',
    category: 'men',
    subcategory: 'Linen Essentials',
    price: 1499,
    originalPrice: 1999,
    rating: 4.9,
    reviewsCount: 142,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Sage Green', hex: '#8da399' },
      { name: 'Natural Sand', hex: '#d9cdb8' },
      { name: 'Pure White', hex: '#ffffff' }
    ],
    fabric: '100% Belgian Flax Linen',
    fabricDetails: 'Pre-washed 180 GSM natural flax linen with genuine mother-of-pearl buttons. Highly breathable and softens gracefully with every wash.',
    description: 'A summer staple tailored for humid afternoons and casual evenings. Cut in a modern relaxed silhouette with a structured collar that holds its form.',
    careInstructions: [
      'Machine wash gentle cold (30°C)',
      'Use mild, pH-neutral detergent',
      'Hang dry in shade to preserve color',
      'Warm steam iron while slightly damp'
    ],
    image: linenShirtImg,
    inStock: true,
    stockCount: 14,
    featured: false
  },
  {
    id: 'dg-03',
    name: 'Breathable Cotton Belted Midi Dress',
    category: 'women',
    subcategory: 'Casual Everyday',
    price: 1699,
    originalPrice: 2199,
    rating: 4.9,
    reviewsCount: 184,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Terracotta Clay', hex: '#b86249' },
      { name: 'Mustard Ochre', hex: '#d49b43' },
      { name: 'Earthy Olive', hex: '#6b7252' }
    ],
    fabric: '100% Combed Cotton Poplin',
    fabricDetails: 'Lightweight yet opaque 140 GSM long-staple cotton poplin with soft handfeel and natural drape. Features two practical deep side pockets.',
    description: 'Effortless all-day comfort. Features a modest V-neckline, rolled sleeve cuffs, and a self-fabric tie belt to cinch or wear relaxed.',
    careInstructions: [
      'Machine wash cold with like colors',
      'Do not bleach or tumble dry',
      'Medium heat iron',
      'Line dry in shade'
    ],
    image: dressImg,
    inStock: true,
    stockCount: 18,
    featured: false
  }
];

export const STORE_INFO = {
  name: 'Durga Garments',
  foundedYear: '1998',
  tagline: 'Ethnic & Everyday Clothing, Fancy Dress Costumes & Custom Tailoring',
  address: 'Shop No. 7-1-434, Maruthi Street, Near Monda Market, Secunderabad',
  city: 'Secunderabad, Hyderabad, Telangana',
  pincode: '500003',
  phone: '+91 97013 50123',
  altPhone: '+91 90303 43446',
  rawPhone: '9701350123',
  mapsUrl: 'https://share.google/tVdZZrMefxETSBLH6',
  whatsappUrl: 'https://wa.me/919701350123?text=Hello%20Durga%20Garments,%20I%20would%20like%20to%20inquire%20about%20your%20clothing%20and%20costumes%20collection.',
  email: 'durgagarments.in@gmail.com',
  hours: {
    weekdays: '11:30 AM - 9:00 PM (Mon - Sat)',
    sunday: '10:00 AM - 2:00 PM (Sunday)'
  },
  services: [
    'Everyday & Festive Ethnic Clothing (Men, Women, Kids)',
    'Fancy Dress Costumes for Schools, Annual Days & Competitions',
    'Mythological, Freedom Fighter & Cultural Characters',
    'Wholesale & Retail Orders',
    'Customized Tailoring & On-Site Fitting'
  ],
  alterationPerk: 'Complimentary on-site fitting & alterations for retail store purchases',
  freeShippingThreshold: 1499
};
