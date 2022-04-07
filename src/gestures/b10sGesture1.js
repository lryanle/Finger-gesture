import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe backward 10s gesture (thumb left) 👈
const b10sGesture1Description = new GestureDescription('b10sGesture1');

// thumb
b10sGesture1Description.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
b10sGesture1Description.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
b10sGesture1Description.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9);
b10sGesture1Description.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.9);

// all other fingers
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  b10sGesture1Description.addCurl(finger, FingerCurl.FullCurl, 1.0);
  b10sGesture1Description.addCurl(finger, FingerCurl.HalfCurl, 0.9);
  b10sGesture1Description.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  b10sGesture1Description.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9);
  b10sGesture1Description.addDirection(finger, FingerDirection.DiagonalUpRight, 0.9);
}

export default b10sGesture1Description;
