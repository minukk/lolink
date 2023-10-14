export interface IProduct {
  email: string;
  id: string;
  userId: string;
  nickname: string;
  like: number;
  views: number;
  title: string;
  body: string;
  price: number;
  location: string;
  location_detail: string;
  category: string;
  imageUrls: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateProduct {
  title: string;
  body: string;
  price: number;
  location: string;
  category: string;
  imageUrls: string;
}

export interface ICreateProduct {
  email?: string,
  title: string,
  body: string,
  price: number,
  location: string,
  locationDetail: string,
  category: string,
  imageUrls: string,
}
