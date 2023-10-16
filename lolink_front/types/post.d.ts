import { IHashtag } from './hashtag';

export interface IPost {
  email: string;
  id: number;
  userId: string;
  title: string;
  body: string;
  imageUrls: string;
  nickname: string;
  category: string;
  recommendCount: number;
  views: number;
  show: boolean;
  createdAt: Date;
  updatedAt: Date;
  hashtags: IHashtag[];
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
  hashtags: string[];
}