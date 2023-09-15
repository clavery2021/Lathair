import { Alert } from 'react-native';
import { singleCoupon } from "../../redux/basketSlice";
import { addCoupon } from "../../redux/couponBookSlice";

const sendFreeCouponButtonUtils = ({message, id, title, image, dispatch, navigation }) => {

  if (message.trim().length < 5) {
    Alert.alert(
      'Message Required',
      'Please enter a message with a minimum of 5 characters.',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  } else {
    Alert.alert(
      'Confirm Send Coupon',
      'Are you sure you want to send this as a single coupon?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Send',
          onPress: () => {
            dispatch(singleCoupon({ id, title, image, message }));
            navigation.navigate('Checkout');
          },
        },
      ]
    );
  }
};

const addToCouponBookButtonUtils = ({ dispatch, message, id, title, image, setMessage, numItemsInCouponBook }) => {
    dispatch(addCoupon({ id, title, image, message }));
    setMessage(''); // Clear the message input field
    console.log(numItemsInCouponBook);
  
    if (message.trim().length < 5) {
        Alert.alert(
          'Message Required',
          'Please enter a message with a minimum of 5 characters.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
      } else {
    // Show a success message
    Alert.alert(
      'Coupon Added',
      'Coupon added to your book.',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  };
}

const navigateToCouponBookScreen = ( {numItemsInCouponBook, navigation} ) => {
  console.log(numItemsInCouponBook)
  if (numItemsInCouponBook > 1) {
    navigation.navigate('CouponBookScreen');
  } else {
    // Show an alert to add a coupon to the book
    Alert.alert(
      'Add a Coupon',
      'Please add a coupon to your book before accessing the coupon book.',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  }
};

export {
    sendFreeCouponButtonUtils,
    addToCouponBookButtonUtils,
    navigateToCouponBookScreen,
}