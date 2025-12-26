export type Locale = "ar" | "fr" | "en" | "zh";

export interface LocalizedString {
  ar: string;
  fr: string;
  en: string;
  zh: string;
}

export interface Banner {
  id: string;
  title: LocalizedString;
  subtitle?: LocalizedString;
  image: string;
  link?: string;
  order: number;
  isActive: boolean;
}

export interface NewsCategory {
  id: string;
  name: LocalizedString;
  slug: string;
  order: number;
}

export interface News {
  id: string;
  title: LocalizedString;
  slug: string;
  excerpt?: LocalizedString;
  content: LocalizedString;
  image?: string;
  category?: NewsCategory;
  isPublished: boolean;
  publishedAt?: Date;
  viewCount: number;
  createdAt: Date;
}

export interface ProductCategory {
  id: string;
  name: LocalizedString;
  slug: string;
  image?: string;
  order: number;
}

export interface Product {
  id: string;
  name: LocalizedString;
  slug: string;
  description?: LocalizedString;
  content?: LocalizedString;
  image?: string;
  images: string[];
  category?: ProductCategory;
  isActive: boolean;
  order: number;
}

export interface Project {
  id: string;
  title: LocalizedString;
  slug: string;
  description?: LocalizedString;
  content?: LocalizedString;
  client?: LocalizedString;
  location?: LocalizedString;
  year?: string;
  image?: string;
  images: string[];
  isActive: boolean;
  order: number;
}

export interface CompanyInfo {
  id: string;
  key: string;
  value: LocalizedString;
}

export interface Timeline {
  id: string;
  year: string;
  title: LocalizedString;
  description?: LocalizedString;
  order: number;
}

export interface TeamMember {
  id: string;
  name: LocalizedString;
  position: LocalizedString;
  bio?: LocalizedString;
  image?: string;
  order: number;
  isActive: boolean;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  order: number;
  isActive: boolean;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
}

export interface Media {
  id: string;
  name: string;
  url: string;
  type: "image" | "video" | "document";
  size: number;
  mimeType: string;
  createdAt: Date;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
