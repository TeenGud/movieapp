import { createContext } from 'react';
import { genres, sessionId } from './handleEvents';

export const SessionIdContext = createContext(sessionId);
export const GenresContext = createContext(genres);
