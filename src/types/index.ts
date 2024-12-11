export interface User {
  id: string;
  avatar: string;
  name: string;
}
export interface Message {
  id: string;
  sender: string;
  sentTime: string;
  content: string;
  threadId?: number;
}
export type AsyncState = null | 'loading' | 'error' | 'complete';
