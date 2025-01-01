import { startSession } from '../fetch';

const fetchSessionId = async () => {
  const res = await startSession();
  console.log(res.guest_session_id);
  return res.guest_session_id;
};
export const sessionId = localStorage.sessionId ? localStorage.sessionId : await fetchSessionId();
