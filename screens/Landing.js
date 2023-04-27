import Checkout from "./Checkout"
import Home from "./Home"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Recevied from "./Received";
import Sent from "./Sent";
import Account from "./Account";
import DiscoverCoupons from "./DiscoverCoupons";

const Tab = createBottomTabNavigator();

const Landing = () => {
    return (
        <Tab.Navigator>
          {/* One of these could be a menu tab that pulls up more screenOptions
          insta has 6 tabs on display */}
          {/* <Tab.Screen name="Home" component={Home} /> */}
          <Tab.Screen name="DiscoverCoupons" component={DiscoverCoupons} />
          <Tab.Screen name="Checkout" component={Checkout} />
          <Tab.Screen name="Received" component={Recevied} />
          <Tab.Screen name="Sent" component={Sent} />
          <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>
    )
}

export default Landing;