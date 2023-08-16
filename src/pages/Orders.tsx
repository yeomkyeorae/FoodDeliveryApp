import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {Order} from '../slices/order';
import EachOrder from '../components/EachOrder';

function Orders() {
  const orders = useSelector((state: RootState) => state.order.orders);

  const renderItem = useCallback(({item}: {item: Order}) => {
    return <EachOrder item={item} />;
  }, []);

  return (
    // ScrollView 보다는 FlatList를 쓰자
    <FlatList
      data={orders}
      keyExtractor={item => item.orderId}
      renderItem={renderItem}
    />
  );
}

export default Orders;
