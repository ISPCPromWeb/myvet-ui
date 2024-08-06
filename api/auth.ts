import { API_URL } from "@/api/constants";
import { redirect } from "next/navigation";
/* import { cookies } from "next/headers"; */

const login = async (formData: FormData) => {
  /* if (cookies().get("user")) {
    cookies().delete("user");
  } */

  const form = formData;
  form.append("pub_date", new Date().toISOString());

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    body: form,
  });

  const result = await res.json();
  const rawCookies = res.headers.get("set-cookie");

  if (rawCookies) {
    const cookie = rawCookies.split(",");
    let cookiesSet = false;

    cookie.forEach((segment) => {
      const segments = segment.split(";");
      const [keyValue] = segments;
      const [name, value] = keyValue.split("=").map((str) => str.trim());
      /* if (name === "csrftoken" || name === "sessionid") {
        if (name === "csrftoken") {
          cookies().set("userToken", value);
        }

        if (name === "sessionid") {
          cookies().set("userSession", value);
        }

        cookiesSet = true;
      } */
    });

    if (cookiesSet) {
      /* cookies().set("user", JSON.stringify(result)); */
      redirect("/dashboard");
    } else {
      console.error("Failed to set cookies");
      redirect("/login");
    }
  } else {
    console.error("No cookies received from the server");
    return result;
    /* redirect("/login"); */
  }
};

const logout = async (req: any) => {
  const res = await fetch(`${API_URL}/logout`, { ...req, method: "POST" });
  const result = await res.json();
  /* cookies().delete("userToken");
  cookies().delete("userSession");
  cookies().delete("user"); */

  /* redirect("/"); */
  return result;
};

export const authApi = {
  userLogin: login,
  userLogout: logout,
};
