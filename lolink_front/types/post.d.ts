export interface IPost {
  email: string;
  id: number;
  userId: string;
  title: string;
  body: string;
  imageUrls: string;
  nickname: string;
  category: string;
  recommend: number;
  views: number;
  show: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreatePost {
  email: string;
  userId: string;
  title: string;
  body: string;
  category: string;
  imageUrls: string;
}

export interface IUpdatePost {
  title: string;
  body: string;
  category: string;
  imageUrls: string;
}