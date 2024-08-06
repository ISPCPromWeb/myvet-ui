import { UserForm } from "@/components/UserForm";
import styles from "./index.module.css";
import { WithAuth } from "@/components/WithAuth";
import { DashboardLayout } from "@/components/DashboardLayout";

const Dashboard = () => {
  return (
    <WithAuth>
      <DashboardLayout>
        <UserForm />
      </DashboardLayout>
    </WithAuth>
  );
};

export default Dashboard;
