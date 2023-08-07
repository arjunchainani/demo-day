import { ReactNode } from "react";

interface Props {
  styling: string;
  id: string;
  children: ReactNode;
}

const Background = ({ styling, id, children }: Props) => {
  return (
    <div className={styling} id={id}>
      {children}
    </div>
  );
};

export default Background;
