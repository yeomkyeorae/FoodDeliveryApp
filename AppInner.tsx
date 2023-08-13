import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from './src/pages/Settings';
import Orders from './src/pages/Orders';
import Delivery from './src/pages/Delivery';
import React, {useEffect} from 'react';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import useSocket from './src/hooks/useSocket';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);

  // 소켓
  // 키, 값 형태로 주고 받음
  const [socket, disconnect] = useSocket();

  useEffect(() => {
    const helloCallback = (data: any) => {
      console.log(data);
    };
    if (socket && isLoggedIn) {
      socket.emit('login', 'hello'); // 소켓에 전송할 때: emit
      socket.on('hello', helloCallback); // 소켓으로부터 받을 때
    }
    return () => {
      // clean-up
      if (socket) {
        socket.off('hello', helloCallback); // 소켓 통신 그만하기
      }
    };
  }, [isLoggedIn, socket]);

  useEffect(() => {
    if (!isLoggedIn) {
      disconnect();
    }
  }, [isLoggedIn, disconnect]);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Group>
            <Tab.Screen
              name="Orders"
              component={Orders}
              options={{title: '오더 목록'}}
            />
            <Tab.Screen
              name="Delivery"
              component={Delivery}
              options={{headerShown: false}}
            />
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{title: '내 정보'}}
            />
          </Tab.Group>
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{title: '로그인'}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: '회원가입'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppInner;
