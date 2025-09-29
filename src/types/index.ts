export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  images: string[];
  description: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  features: string[];
  brand: string;
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
}

export interface Address {
  id: number;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  address: Address;
  orderDate: string;
  deliveryDate?: string;
}

export interface FilterOptions {
  priceRange: [number, number];
  rating: number;
  category: string;
  subcategory: string;
  brand: string;
  sortBy: 'price-low' | 'price-high' | 'rating' | 'newest' | 'popularity';
}