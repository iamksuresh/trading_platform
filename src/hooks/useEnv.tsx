// Acccess env variables here
export const useEnv = () => {
  const FXPairs = process.env.REACT_APP_INSTRUMENT_ID_ARRAY;
  const ThrottleLimit = process.env.REACT_APP_THROTTLE_TIME
    ? parseInt(process.env.REACT_APP_THROTTLE_TIME, 10)
    : 3000;

  return {
    FXPairs,
    ThrottleLimit,
  };
};
