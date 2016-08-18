export const convertMsToTime = (duration) => {
  let seconds = parseInt((duration/1000)%60)
    , minutes = parseInt((duration/(1000*60))%60);

  seconds = (seconds < 10) ? "0" + seconds : seconds;
  mintues = (minutes < 10) ? "0" + minutes : minutes;

  return minutes + ":" + seconds;
}
