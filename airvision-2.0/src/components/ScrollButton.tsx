interface Props {
  direction: number; // 0 for up, 1 for down
  href: string;
}

const ScrollButton = ({ direction, href }: Props) => {
  const Logos = ["fas fa-arrow-up", "fa-solid fa-arrow-down"];

  return (
    <>
      <a href={href} className="scroll_link">
        <button
          type="button"
          className="btn btn-danger btn-floating btn-lg scroll"
        >
          <i className={Logos[direction]}></i>
        </button>
      </a>
    </>
  );
};

export default ScrollButton;
