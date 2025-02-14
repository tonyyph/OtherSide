import { VerticalNews } from "@/components/news/v-news";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BookmarksScreen() {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        style={{ paddingTop: top / 3 }}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="mb-6"
      >
        <VerticalNews
          title="If Liverpool beat Everton, it will have been the right decision"
          category="U.K"
          imgUrl="https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/3c1b/live/54b6a300-e85e-11ef-bd1b-d536627785f2.jpg"
          isBookmarked={true}
        />
        <VerticalNews
          title="Everton are sweating on the fitness of left-back Vitalii Mykolenko after the Ukrainian missed the FA Cup defeat by Bournemouth because of a calf injury"
          category="U.S"
          imgUrl="https://ichef.bbci.co.uk/ace/standard/800/cpsprodpb/vivo/live/images/2025/2/11/a3d23fd7-dab4-4885-b07c-38fd361dca37.jpg.webp"
          isBookmarked={true}
        />
        <View style={{ height: bottom * 3 }} />
      </ScrollView>
    </View>
  );
}
