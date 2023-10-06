
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, fetchSignInMethodsForEmail } from "firebase/auth";
import sanityClient from "../../../sanity";

import { app } from "../../../config/firebase";

const auth = getAuth(app);

 const connectUser = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // setUserId(user.uid);
      console.log(user.uid);
    } catch (error) {
      console.log(error);
    }
  };
  
  const connectNewUser = async ({ email, userName, password }) => {
    try {

      const isEmailUnique = await checkEmailUniqueness(email);

      if (!isEmailUnique) {
        console.error('Email is already in use.');
        return; // Prevent user creation
      }

      const isUsernameUnique = await checkUsernameUniqueness(userName);

      if (!isUsernameUnique) {
        console.error('Username is already taken.');
        return; // Prevent user creation
      }
  
      
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(userCredential)
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: userName,
      });

         // Step 3: Create user in Sanity.io
    const token = "skWcyp2782tUHFJD8YsiRsG55gm2hudj7D93CbJpISumYuldWHOilNBZuTZp4iwd0EbRcCbgNjxjTCMnYswR8FolWRywEqTa3kWZNryQpUcHRflkpcBFh2CCOZ2auT4IGC70bxMaSbYncvhSjwA8Nesk83aQEBq1OfFWdhc4gjBKvAUtJLIk";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const newUser = {
      _type: 'user',
      userId : user.uid,
      email: email,
      userName: userName,
    };

    await sanityClient.create(newUser, config);

      // setUserId(user.uid);

    } catch (error) {
      console.log(error);
    }
  };

  const checkEmailUniqueness = async (email) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods && methods.length > 0) {
        // Email is already registered
        return false;
      } else {
        // Email is unique
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const checkUsernameUniqueness = async (userName) => {
    try {
      // Query your Sanity.io database to check if the username exists
      const existingUser = await sanityClient.fetch('*[_type == "user" && userName == $userName]', {
        userName,
      });
  
      return !existingUser || existingUser.length === 0;
    } catch (error) {
      // Handle the error
      console.error(error);
      return false;
    }
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordPattern.test(password);
  };

  export {
    connectNewUser,
    connectUser,
  }