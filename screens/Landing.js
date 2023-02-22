import Checkout from "./Checkout"
import Home from "./Home"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Landing = () => {
    return (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Checkout" component={Checkout} />
        </Tab.Navigator>
    )
}

export default Landing;