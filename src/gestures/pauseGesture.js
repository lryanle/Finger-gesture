import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe pause gesture (full hand) ✋
const pauseGestureDescription = new GestureDescription('pauseGesture');

// thumb
pauseGestureDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
pauseGestureDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
pauseGestureDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9);
pauseGestureDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.9);

// all other fingers
for(let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  pauseGestureDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
  pauseGestureDescription.addCurl(finger, FingerCurl.HalfCurl, 0.9);
  pauseGestureDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  pauseGestureDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9);
  pauseGestureDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 0.9);
}

export default pauseGestureDescription;
