export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  folderId: number;
  createdAt: Date;
}

export interface Folder {
  id: number;
  name: string;
  color: string;
}
