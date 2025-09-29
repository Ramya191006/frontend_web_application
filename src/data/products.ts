import { Product } from '../types';

export const products: Product[] = [
  // Fashion Category
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 799,
    originalPrice: 1299,
    category: "Fashion",
    subcategory: "T-Shirts",
    images: [
      "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Comfortable premium cotton t-shirt with modern fit. Perfect for casual wear and daily activities.",
    rating: 4.5,
    reviewCount: 1250,
    inStock: true,
    features: ["100% Cotton", "Machine Washable", "Regular Fit", "Breathable Fabric"],
    brand: "StyleCraft",
    discount: 38
  },
  {
    id: 2,
    name: "Denim Jeans Slim Fit",
    price: 2499,
    originalPrice: 3999,
    category: "Fashion",
    subcategory: "Jeans",
    images: [
      "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "High-quality denim jeans with slim fit design. Durable construction with comfortable stretch.",
    rating: 4.3,
    reviewCount: 890,
    inStock: true,
    features: ["Stretch Denim", "5-Pocket Design", "Slim Fit", "Fade Resistant"],
    brand: "DenimCo",
    discount: 37
  },
  {
    id: 3,
    name: "Casual Sneakers",
    price: 3999,
    originalPrice: 5999,
    category: "Fashion",
    subcategory: "Footwear",
    images: [
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Comfortable casual sneakers perfect for everyday wear. Lightweight design with excellent cushioning.",
    rating: 4.7,
    reviewCount: 2100,
    inStock: true,
    features: ["Cushioned Sole", "Breathable Material", "Slip Resistant", "Lightweight"],
    brand: "ComfortStep",
    discount: 33
  },

  // Electronics Category
  {
    id: 4,
    name: "Wireless Bluetooth Headphones",
    price: 4999,
    originalPrice: 7999,
    category: "Electronics",
    subcategory: "Audio",
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Premium wireless headphones with noise cancellation and superior sound quality.",
    rating: 4.6,
    reviewCount: 1580,
    inStock: true,
    features: ["Noise Cancellation", "30-hour Battery", "Quick Charge", "Premium Sound"],
    brand: "AudioTech",
    discount: 37
  },
  {
    id: 5,
    name: "Smart Fitness Watch",
    price: 8999,
    originalPrice: 12999,
    category: "Electronics",
    subcategory: "Wearables",
    images: [
      "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Advanced fitness watch with health monitoring, GPS tracking, and smart notifications.",
    rating: 4.4,
    reviewCount: 967,
    inStock: true,
    features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "7-day Battery"],
    brand: "FitTrack",
    discount: 31
  },
  {
    id: 6,
    name: "Portable Power Bank",
    price: 1999,
    originalPrice: 2999,
    category: "Electronics",
    subcategory: "Accessories",
    images: [
      "https://images.pexels.com/photos/4498479/pexels-photo-4498479.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/163041/phone-cellular-cellphone-telephone-163041.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "High-capacity portable power bank with fast charging support for all devices.",
    rating: 4.2,
    reviewCount: 756,
    inStock: true,
    features: ["20000mAh Capacity", "Fast Charging", "Multiple Ports", "LED Indicator"],
    brand: "PowerMax",
    discount: 33
  },

  // Toys Category
  {
    id: 7,
    name: "Educational Building Blocks",
    price: 1599,
    originalPrice: 2299,
    category: "Toys",
    subcategory: "Educational",
    images: [
      "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/4481263/pexels-photo-4481263.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Colorful building blocks set that promotes creativity and learning in children.",
    rating: 4.8,
    reviewCount: 445,
    inStock: true,
    features: ["Safe Materials", "100+ Pieces", "Educational", "Age 3+"],
    brand: "LearnPlay",
    discount: 30
  },
  {
    id: 8,
    name: "Remote Control Drone",
    price: 3499,
    originalPrice: 4999,
    category: "Toys",
    subcategory: "Remote Control",
    images: [
      "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/2876709/pexels-photo-2876709.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Easy-to-fly drone with HD camera, perfect for beginners and outdoor adventures.",
    rating: 4.3,
    reviewCount: 623,
    inStock: true,
    features: ["HD Camera", "30min Flight Time", "Auto Hover", "Easy Controls"],
    brand: "SkyTech",
    discount: 30
  },

  // Home & Lifestyle Category
  {
    id: 9,
    name: "Premium Coffee Maker",
    price: 6999,
    originalPrice: 9999,
    category: "Home & Lifestyle",
    subcategory: "Kitchen",
    images: [
      "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/2318487/pexels-photo-2318487.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Automatic coffee maker with programmable features for the perfect brew every time.",
    rating: 4.5,
    reviewCount: 1123,
    inStock: true,
    features: ["Programmable", "12-Cup Capacity", "Auto Shut-off", "Stainless Steel"],
    brand: "BrewMaster",
    discount: 30
  },
  {
    id: 10,
    name: "Decorative Plant Pot Set",
    price: 899,
    originalPrice: 1499,
    category: "Home & Lifestyle",
    subcategory: "Decor",
    images: [
      "https://images.pexels.com/photos/1055379/pexels-photo-1055379.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1974508/pexels-photo-1974508.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Beautiful ceramic plant pot set perfect for indoor plants and home decoration.",
    rating: 4.6,
    reviewCount: 789,
    inStock: true,
    features: ["Ceramic Material", "Drainage Holes", "Set of 3", "Modern Design"],
    brand: "HomeDecor",
    discount: 40
  }
];

export const categories = [
  {
    name: "Fashion",
    subcategories: ["T-Shirts", "Jeans", "Footwear", "Accessories"],
    image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    name: "Electronics",
    subcategories: ["Audio", "Wearables", "Accessories", "Mobile"],
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    name: "Toys",
    subcategories: ["Educational", "Remote Control", "Board Games", "Action Figures"],
    image: "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    name: "Home & Lifestyle",
    subcategories: ["Kitchen", "Decor", "Furniture", "Garden"],
    image: "https://images.pexels.com/photos/1055379/pexels-photo-1055379.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
];