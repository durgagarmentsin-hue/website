export type Category = 'all' | 'men' | 'women' | 'kids' | 'ethnic';

export interface Product {
  id: string;
  name: string;
  category: 'men' | 'women' | 'kids' | 'ethnic';
  subcategory: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  sizes: string[];
  colors: { name: string; hex: string }[];
  fabric: string;
  fabricDetails: string;
  description: string;
  careInstructions: string[];
  image: string;
  inStock: boolean;
  stockCount: number;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique item composite key (productId + size + color)
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: 'cod' | 'upi';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  date: string;
}
