import { Animated } from 'react-native';
import { MotionPressable } from './MotionPressable';
// @ts-ignore This was there in v2 but not in v4
import { styled } from 'nativewind';
import { createMotionComponent } from './createMotionComponent';
export let Motion;
(function (_Motion) {
  const View = _Motion.View = createMotionComponent(styled(Animated.View));
  const Text = _Motion.Text = createMotionComponent(styled(Animated.Text));
  const FlatList = _Motion.FlatList = createMotionComponent(styled(Animated.FlatList));
  const Image = _Motion.Image = createMotionComponent(styled(Animated.Image));
  const ScrollView = _Motion.ScrollView = createMotionComponent(styled(Animated.ScrollView));
  const SectionList = _Motion.SectionList = createMotionComponent(styled(Animated.SectionList));
  const Pressable = _Motion.Pressable = styled(MotionPressable);
})(Motion || (Motion = {}));
//# sourceMappingURL=styled.js.map