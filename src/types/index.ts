export interface User {
  id: string;
  avatar: string;
  name: string;
}
export interface Message {
  id: string;
  sender: string;
  createdAt: Date;
  content: string;
}
export type AsyncState = null | 'loading' | 'error' | 'complete';
