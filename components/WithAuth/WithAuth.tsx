import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const WithAuth = (props: any) => {
  const { children } = props;

  const router = useRouter();
  useEffect(() => {
    let user;
    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("user") || "null");
    }
    if (!user) {
      router.replace(`/`);
    }
  }, []);

  return <>{children}</>;
};
