import { StaticImageData } from "next/image";

export interface BlogContentBlock {
  type: string;
  content: string;
}

export interface BlogPost {
  id: string;
  createdAt: string | Date;
  title: string;
  category: string;
  content: BlogContentBlock[];
  thumbnail: StaticImageData | string;
  views: number;
}

export interface BlogState {
  blogPosts: BlogPost[];
  currentBlogPost: BlogPost | null;
}
