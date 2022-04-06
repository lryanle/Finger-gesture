import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe pause gesture (fist) ✊ 
const pauseGestureDescription = new GestureDescription('pauseGesture');

// thumb
pauseGestureDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
pauseGestureDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.85);

// all other fingers
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  pauseGestureDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  pauseGestureDescription.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

export default pauseGestureDescription;
