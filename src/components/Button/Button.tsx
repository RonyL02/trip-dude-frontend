import { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.css";
type Props = {
  text: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({ text, className, ...props }) => {
  return (
    <button
      className={`${styles.button} ${className} ${
        props.disabled ? styles.disabledButton : ""
      }`}
      {...props}
    >
      {text}
    </button>
  );
};
