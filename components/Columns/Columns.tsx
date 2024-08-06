import styles from "./Columns.module.css";

interface ColumnsProps {
  color: string;
  reversed?: boolean;
  children: React.ReactNode;
  borderRadius: string;
}

export const Columns = (props: ColumnsProps) => {
  const { color, borderRadius, children, reversed } = props;
  return (
    <div
      className={`d-flex col-12 ${styles.servicioFila} ${
        styles.servicios
      } bg-${color} rounded-${borderRadius} ${reversed && styles.reversed}`}
    >
      {children}
    </div>
  );
};
