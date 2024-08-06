/* import { cookies } from "next/headers";

const parsedUser = () => {
  const cookieStore = cookies();
  const rawUser = cookieStore.get("user");
  if (rawUser) {
    return JSON.parse(rawUser.value);
  }
  return {};
};

export const getSessionId = () => {
  const cookieStore = cookies();
  return cookieStore.get("userSession");
};

export const getToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("userToken");
};

export const user = parsedUser();
export const sessionId = getSessionId();
export const token = getToken();
 */
