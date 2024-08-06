import styles from "./ButtonSmall.module.css";

interface ButtonSmallProps {
  name: string;
  type: "submit" | "reset" | "button";
  callback?: any;
}
export const ButtonSmall = (props: ButtonSmallProps) => {
  const { name, type, callback } = props;
  return (
    <div
      className={`${styles.contButton} d-flex d-md-block justify-content-center`}
    >
      <button
        onClick={callback}
        type={`${type}`}
        className={`${styles.btn1} btn`}
      >
        {name}
      </button>
    </div>
  );
};
