import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe forward 10s gesture 2 (index right) 👉
const f10sGesture2Description = new GestureDescription('f10sGesture2');

// thumb
f10sGesture2Description.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);

// index
f10sGesture2Description.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
f10sGesture2Description.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);
f10sGesture2Description.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.9);
f10sGesture2Description.addDirection(Finger.Index, FingerDirection.DiagonalDownRight, 0.9);

// all other fingers
for(let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  f10sGesture2Description.addCurl(finger, FingerCurl.FullCurl, 1.0);
  f10sGesture2Description.addCurl(finger, FingerCurl.HalfCurl, 0.9);
  f10sGesture2Description.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
  f10sGesture2Description.addDirection(finger, FingerDirection.DiagonalUpRight, 0.9);
  f10sGesture2Description.addDirection(finger, FingerDirection.DiagonalDownRight, 0.9);
}

export default f10sGesture2Description;
