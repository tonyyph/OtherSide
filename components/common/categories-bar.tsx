import { useRef, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import CategoryData from "../test/mockup";
import { Text } from "../ui/text";
import { useUserSettingsStore } from "@/stores/user-settings/store";
import { useColorPalette } from "@/hooks/use-color-palette";

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift("All");
  return categories;
};

const getCategoryList = (category: string, data: any) => {
  if (category == "All") {
    return data;
  } else {
    let coffeelist = data.filter((item: any) => item.name == category);
    return coffeelist;
  }
};

export const CategoriesBar = ({ onPress }: any) => {
  const { getColor } = useColorPalette();

  const [categories, setCategories] = useState(
    getCategoriesFromData(CategoryData)
  );
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0]
  });
  const [sortCategory, setSortCategory] = useState(
    getCategoryList(categoryIndex.category, CategoryData)
  );
  const ListRef: any = useRef<FlatList>();

  return (
    <View className="flex-1 w-full h-32 flex-row items-end space-x-4 border-b border-border bg-background px-4 py-2">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-1 mb-2"
        contentContainerStyle={{}}
      >
        {categories.map((data, index) => (
          <View key={index.toString()} className="px-3">
            <TouchableOpacity
              className="flex items-center"
              onPress={() => {
                onPress();
                ListRef?.current?.scrollToOffset({
                  animated: true,
                  offset: 0
                });
                setCategoryIndex({ index: index, category: categories[index] });
                setSortCategory([
                  ...getCategoryList(categories[index], CategoryData)
                ]);
              }}
            >
              <Text
                className={"text-lg text-muted-foreground"}
                style={[
                  categoryIndex.index == index
                    ? {
                        color: getColor("--primary"),
                        fontWeight: "bold"
                      }
                    : {}
                ]}
              >
                {data}
              </Text>
              {categoryIndex.index == index ? (
                <View
                  className="border border-border rounded-full h-[12px] w-[12px]"
                  style={{ backgroundColor: getColor("--primary") }}
                />
              ) : (
                <></>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
