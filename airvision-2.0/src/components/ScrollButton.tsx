interface Props {
  direction: number; // 0 for up, 1 for down
}

const ScrollButton = ({ direction }: Props) => {
  const Logos = ["fas fa-arrow-up", "fa-solid fa-arrow-down"];

  return (
    <>
      <button
        type="button"
        className="btn btn-danger btn-floating btn-lg scroll"
      >
        <i className={Logos[direction]}></i>
      </button>
    </>
  );
};

export default ScrollButton;
