export interface Vendor {
  id: string;
  name: string;
  badge: string;
  rating: number;
  avatar: string;
  verified: boolean;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  vendor: Vendor;
  tag?: "New" | "Featured" | "Limited" | "Best Seller";
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}