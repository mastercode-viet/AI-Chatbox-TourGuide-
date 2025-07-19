
import type { ReactNode } from 'react';

export interface Tour {
  name: string;
  highlights: string;
  duration: string;
  price: string;
  reason: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: ReactNode;
}
