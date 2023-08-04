import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const DismissKeyboardView: React.FC<{
  // props
  // style에 대한 props은 암기하는 편이 낫다
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}> = ({children, ...props}) => (
  // accessible false는 (시각) 장애인을 위한 스크린 리더기에게 불필요한 버튼임을 알리는 것
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView {...props} style={props.style}>
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
