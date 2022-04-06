import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe backward 10s gesture 2 (index left) 👈
const b10sGesture2Description = new GestureDescription('b10sGesture2');

// thumb
b10sGesture2Description.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);

// index
b10sGesture2Description.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
b10sGesture2Description.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
b10sGesture2Description.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.9);
b10sGesture2Description.addDirection(Finger.Index, FingerDirection.DiagonalDownLeft, 0.9);

// all other fingers
for(let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  b10sGesture2Description.addCurl(finger, FingerCurl.FullCurl, 1.0);
  b10sGesture2Description.addCurl(finger, FingerCurl.HalfCurl, 0.9);
  b10sGesture2Description.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  b10sGesture2Description.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9);
  b10sGesture2Description.addDirection(finger, FingerDirection.DiagonalDownLeft, 0.9);
}

export default b10sGesture2Description;
