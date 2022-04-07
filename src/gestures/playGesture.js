import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe play gesture (fist) ✊ 
const playGestureDescription = new GestureDescription('playGesture');

// thumb
playGestureDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
playGestureDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.85);

// all other fingers
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  playGestureDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  playGestureDescription.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

export default playGestureDescription;
