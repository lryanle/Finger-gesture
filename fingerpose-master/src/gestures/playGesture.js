import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe play gesture (full hand) ✋
const playGestureDescription = new GestureDescription('playGesture');

// thumb
playGestureDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
playGestureDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
playGestureDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9);
playGestureDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.9);

// all other fingers
for(let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  playGestureDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
  playGestureDescription.addCurl(finger, FingerCurl.HalfCurl, 0.9);
  playGestureDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  playGestureDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9);
  playGestureDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 0.9);
}

export default playGestureDescription;
