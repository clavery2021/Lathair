import { useState, useEffect } from 'react';
import sanityClient from "../../sanity";

const [receivedCoupons, setReceivedCoupons] = useState([]);

export const handleCouponUsage = async (coupon) => {
    console.log('Coupon:', coupon);
    const token = "skWcyp2782tUHFJD8YsiRsG55gm2hudj7D93CbJpISumYuldWHOilNBZuTZp4iwd0EbRcCbgNjxjTCMnYswR8FolWRywEqTa3kWZNryQpUcHRflkpcBFh2CCOZ2auT4IGC70bxMaSbYncvhSjwA8Nesk83aQEBq1OfFWdhc4gjBKvAUtJLIk";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      console.log('Updating coupon:', coupon._id);
      // Update the 'usedCoupon' field to true
      await sanityClient
        .patch(coupon._id)
        .set({ usedCoupon: true })
        .commit(config);
  
      const updatedCoupons = await sanityClient.fetch(
        `*[_type == "sendCoupon" && receiver == "Receiver"] {...}`,
        config
      );
      setReceivedCoupons(updatedCoupons);
  
    } catch (error) {
      console.error('Error updating coupon:', error.response || error.message);
    }
  };

