import React, {useCallback} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {Order} from '../slices/order';

function Orders() {
  const orders = useSelector((state: RootState) => state.order.orders);

  const toggleDetail = useCallback(() => {}, []);

  const renderItem = useCallback(({item}: {item: Order}) => {
    return (
      <View style={styles.orderContainer}>
        <Pressable onPress={toggleDetail} style={styles.info}>
          <Text style={styles.eachInfo}>
            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
        </Pressable>
      </View>
    );
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

const styles = StyleSheet.create({
  orderContainer: {
    borderRadius: 5,
    margin: 5,
    padding: 10,
    backgroundColor: 'lightgray',
  },
  info: {
    flexDirection: 'row',
  },
  eachInfo: {
    flex: 1,
  },
});

export default Orders;
