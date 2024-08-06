import { Sidebar } from "@/components/Sidebar/Sidebar";
import styles from "./DashboardLayout.module.css";

export const DashboardLayout = ({ children }: any) => {
  return (
    <div className={styles.dashboardLayout}>
      <section className={`${styles.sidebar} `}>
        <Sidebar />
      </section>
      <section className={styles.content}>{children}</section>
    </div>
  );
};
