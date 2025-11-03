export interface Blog {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogWithAuthor extends Blog {
  author: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}
