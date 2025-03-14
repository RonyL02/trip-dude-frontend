import { FC, ImgHTMLAttributes } from "react";

export const Loader: FC<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return <img src="/oval.svg" alt="" {...props} />;
};
