import { useEffect } from "react";

export const BootstrapWrapper = (props: any) => {
  const { children } = props;
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return <div>{children}</div>;
};
