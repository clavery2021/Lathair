import { FontAwesome } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

export const FontSelection = ({ selectedFontStyle, onFontStyleChange, fontStyles }) => {

const isSelected = true; // set this to true or false based on your logic

// define your colors
const darkerColor = "#D58574";
const defaultColor = "#A94442";

// use the selected color if the icon is selected, otherwise use the default color
const iconColor = isSelected ? darkerColor : defaultColor;

  return (
    <View className="mt-4 flex-row items-center justify-between ml-4 mr-8">
      {[...Array(4)].map((_, i) => (
        <View key={i} className="flex-row items-center space-x-2">
          <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
          <TouchableOpacity onPress={() => onPress(fontStyles[i].value)}>
            <FontAwesome name="font" size={24} color={iconColor} />
          </TouchableOpacity>
          </View>
          <View>
            <Text className="text-[#515151]">{i + 1}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
