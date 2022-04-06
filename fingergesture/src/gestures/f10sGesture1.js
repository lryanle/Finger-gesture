import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe forward 10s gesture (thumb right) 👉
const f10sGesture1Description = new GestureDescription('f10sGesture1');

// thumb
f10sGesture1Description.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
f10sGesture1Description.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);
f10sGesture1Description.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.9);
f10sGesture1Description.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.9);

// all other fingers
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  f10sGesture1Description.addCurl(finger, FingerCurl.FullCurl, 1.0);
  f10sGesture1Description.addCurl(finger, FingerCurl.HalfCurl, 0.9);
  f10sGesture1Description.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  f10sGesture1Description.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9);
  f10sGesture1Description.addDirection(finger, FingerDirection.DiagonalUpRight, 0.9);
}

export default f10sGesture1Description;
