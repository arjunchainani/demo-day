interface Props {
  styling: string;
}

const Logo = ({ styling }: Props) => {
  return <div className={styling}>Logo</div>;
};

export default Logo;
