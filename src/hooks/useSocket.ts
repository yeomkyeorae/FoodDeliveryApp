import {useCallback} from 'react';
import {io, Socket} from 'socket.io-client';
import Config from 'react-native-config';

let socket: Socket | undefined; // 함수 바깥. 전역 변수처럼 작동. useSocket에 대해서 소켓을 하나만 유지하기 위해서
const useSocket = (): [typeof socket, () => void] => {
  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = undefined;
    }
  }, []);
  if (!socket) {
    socket = io(`${Config.API_URL}`, {
      transports: ['websocket'],
    });
  }
  return [socket, disconnect];
};

export default useSocket;
