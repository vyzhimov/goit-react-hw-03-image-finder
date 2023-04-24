import errorImage from './Image_not_available.png';

export default function FindError() {
  return (
    <div className="FindError">
      <img src={errorImage} alt="results not found" />
    </div>
  );
}
