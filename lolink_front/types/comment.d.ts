interface IComment {
  id: string;
  postId: string;
  userId: string;
  show: boolean;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ICreateComment {
  postId: string;
  userId: string;
  content: string;
}