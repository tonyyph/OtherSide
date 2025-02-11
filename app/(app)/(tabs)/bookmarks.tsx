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
          title="Jeremy Bowen: Trump's Gaza plan won't happen, but it will have consequences"
          category="European"
          imgUrl="https://ichef.bbci.co.uk/news/1536/cpsprodpb/f7c4/live/abbefb80-e3e9-11ef-a3e9-f7d24490089c.jpg.webp"
          authorName="U.S. News"
          authorAvatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRszCqiHbRA1Im3IrdNS92wEV-bxCjaw7V0OQ&s"
          isBookmarked={true}
        />
        <VerticalNews
          title="Sweden mourns after deadliest shooting as gunman details emerge"
          category="U.S"
          imgUrl="https://ichef.bbci.co.uk/news/1536/cpsprodpb/2e1b/live/0e343f20-e401-11ef-bd1b-d536627785f2.jpg.webp"
          authorName="Newser"
          authorAvatar="https://play-lh.googleusercontent.com/xhCYCJNrasqxulES5F5wR6Os-6RZA2qCMBLkbvB2fP6NzkvLPIJVMCJVRVmOYpVYBw"
          isBookmarked={true}
        />
        <VerticalNews
          title="South Korea orders airports to install bird detection cameras puzzles climate scientists"
          category="Australia"
          imgUrl="https://ichef.bbci.co.uk/news/1536/cpsprodpb/373e/live/dbc3c430-e463-11ef-b734-a507e28e4d9e.jpg.webp"
          authorName="ABC News"
          authorAvatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLas6SIkIzEZ6aTqN39_yEomNNA89CD8hEcQ&s"
          isBookmarked={true}
        />
        <VerticalNews
          title="Record January warmth puzzles climate scientists"
          category="Korea"
          imgUrl="https://ichef.bbci.co.uk/news/1536/cpsprodpb/a4d7/live/015706f0-e3ae-11ef-9c34-470658c222b3.jpg.webp"
          authorName="CNN News"
          authorAvatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpKUY7zHniUGlcUQJeQ6h9UTMoYZEjxNz51w&s"
          isBookmarked={true}
        />
        <VerticalNews
          title="Cruciate knee ligament injury for Man Utd's Martinez"
          category="Vietnam"
          imgUrl="https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/dce6/live/45f59480-e47a-11ef-b2a4-a1d8dd2dca9e.jpg.webp"
          authorName="NBC News"
          authorAvatar="https://play-lh.googleusercontent.com/y8pzzzyZIrS-9OPxcS8joxihyXBTPa8FfoMqp9l2YnoQbw7Pu_CM5A9pspJesw5fh2I"
          isBookmarked={true}
        />
        <VerticalNews category="Switzerland" isBookmarked={true} />
        <VerticalNews
          title="Jeremy Bowen: Trump's Gaza plan won't happen, but it will have consequences"
          category="European"
          imgUrl="https://ichef.bbci.co.uk/news/1536/cpsprodpb/f7c4/live/abbefb80-e3e9-11ef-a3e9-f7d24490089c.jpg.webp"
          authorName="U.S. News"
          authorAvatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRszCqiHbRA1Im3IrdNS92wEV-bxCjaw7V0OQ&s"
          isBookmarked={true}
        />
        <View style={{ height: bottom * 3 }} />
      </ScrollView>
    </View>
  );
}
