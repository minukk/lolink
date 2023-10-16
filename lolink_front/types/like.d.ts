export interface ILike {
  id: number;
  productId: string;
  userId: string;
  type: 'like' | 'unlike';
}