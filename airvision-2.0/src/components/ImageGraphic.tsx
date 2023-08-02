import aqiImage from "./../../public/aqi_image.png";

interface Props {
  imageNum: number;
  styling: string;
}

const ImageGraphic = ({ imageNum, styling }: Props) => {
  const imageCollection = [aqiImage];

  return (
    <img
      src={imageCollection[imageNum]}
      className={styling}
      alt="Unable to Load Image"
    ></img>
  );
};

export default ImageGraphic;
