import errorImage from './Image_not_available.png';

export default function FindError({ message }) {
  return (
    <div>
      <img src={errorImage} alt="results not found" />
      <p>{message}</p>
    </div>
  );
}
