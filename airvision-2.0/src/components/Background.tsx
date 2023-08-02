import { ReactNode } from "react";

interface Props {
  imgPath: string;
  styling: string;
  children: ReactNode;
}

const Background = ({ imgPath, styling, children }: Props) => {
  return <div className={styling}>{children}</div>;
};

export default Background;
