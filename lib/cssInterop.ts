import { Image } from 'expo-image';
import { VideoView } from 'expo-video';
import { cssInterop } from 'nativewind';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

cssInterop(Image, { className: 'style' });
cssInterop(VideoView, { className: 'style' });
cssInterop(Animated.View, { className: 'style' });
cssInterop(SafeAreaView, { className: 'style' });
