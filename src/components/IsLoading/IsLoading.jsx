import { ThreeCircles } from 'react-loader-spinner';

export const IsLoading = () => {
  return (
    <ThreeCircles
      height="100"
      width="100"
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass="LoadingStatus"
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor="#02315c"
      innerCircleColor="#0a82a3"
      middleCircleColor="#02315c"
    />
  );
};
