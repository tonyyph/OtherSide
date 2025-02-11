import {
  FlatList,
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View
} from "react-native";

import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { CalendarClock } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserSettingsStore } from "@/stores/user-settings/store";

const dummyPosts = [
  {
    id: "1",
    imgUrl: `https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/3c1b/live/54b6a300-e85e-11ef-bd1b-d536627785f2.jpg`,
    description: `The fixture list is jam-packed. Ludicrously, Liverpool play five Premier League matches before March.

And this is when the title will be won or lost.

Currently, his first XI is entirely fit - barring Trent Alexander-Arnold, who is touch and go for the Merseyside derby on Wednesday.

This time last year, Jurgen Klopp was battling a mountain of injuries that eventually became unsustainable and led to the season collapsing.

But under Arne Slot, Liverpool are more available and have actually run less than any other side in the division.

And while the squad players let themselves down at Plymouth, Virgil van Dijk, Ryan Gravenberch and Mo Salah stayed on Merseyside and got a much-needed rest.

If Liverpool beat Everton, it will have been the right decision.`,
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4",
    title: "If Liverpool beat Everton, it will have been the right decision"
  },
  {
    id: "2",
    imgUrl: `https://ichef.bbci.co.uk/ace/standard/800/cpsprodpb/vivo/live/images/2025/2/11/a3d23fd7-dab4-4885-b07c-38fd361dca37.jpg.webp`,
    description: `Everton are sweating on the fitness of left-back Vitalii Mykolenko after the Ukrainian missed the FA Cup defeat by Bournemouth because of a calf injury.

Should the 25-year-old be ruled out again tomorrow, it will likely leave Ashley Young, in his 40th year, to deal with Liverpool talisman Mohamed Salah.

For all Young's experience, at this stage of his career David Moyes would probably rather not put him up against arguably the best player in the league this season, at least not from the start.

We'll see if there is any update from Moyes in his news conference at 13:30 GMT.

Meanwhile, Carlos Alcaraz - not that one - pressed his claims for a place in the starting XI with an impressive debut off the bench at the weekend.

The midfielder hit the post from a free-kick and showed plenty of tenacity and positive running after coming on as a 65th-minute substitute.`,
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4",
    title: "Mykolenko a doubt for Everton"
  },
  {
    id: "3",
    imgUrl: `https://ichef.bbci.co.uk/ace/standard/800/cpsprodpb/vivo/live/images/2025/2/11/bc4725b4-fe04-4c92-a5be-5e945c115dc6.jpg.webp`,
    description: `Everton manager David Moyes on bridging the gap to Liverpool: "I'm trying to remember the first ones. Going back that far then, it was a different time. We were probably getting ourselves back into being competitive as a Premier League club.

"The gap between the two teams at the moment has probably been as big as it has been for a long time. So it's something I have to bridge, and start bringing the two clubs closer together.

"At that time, derbies were probably a bit more competitive. It was only in the last few years where we started to finish above them in the Premier League, it's something we're aiming to do again."`,
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4",
    title: "There's a gulf between the two squads"
  },
  {
    id: "4",
    imgUrl: `https://ichef.bbci.co.uk/ace/standard/800/cpsprodpb/vivo/live/images/2025/2/11/8d1f004e-e3a7-4e72-a53c-fd1951f860af.jpg.webp`,
    description: `On Wednesday, Celtic face German giants Bayern Munich in the Champions League play-off round.

Brendan Rodgers' side are going to need something special. Luckily for them, Celtic do have history of spectacular Champions League results:

24 November 2004 - Barcelona 1-1 Celtic - John Hartson's goal secured a huge point for Celtic in the group stages in the Nou Camp.
21 November 2006 - Celtic 1-0 Manchester United - Shunsuke Nakamura's stunning winning free kick is still talked about to this day. A huge win which saw Celtic reach the knockouts.
7 October 2007 - Celtic 2-1 AC Milan - Scott McDonald's last-minute winner sent Celtic Park in to raptures as the defending champions were humbled in the group stages in Glasgow.
2 October 2012 - Spartak Moscow 2-3 Celtic - Georgios Samaras struck a last minute winner in Russia, a key result which helped Celtic progress to the Last 16.
7 November 2012 - Celtic 2-1 Barcelona - Tony Watt's crucial second goal gave Neil Lennon's side a memorable win over Lionel Messi's Barcelona which saw them qualify for the knockout stages.`,
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4",
    title: "Celtic's memorable Champions League nights"
  },
  {
    id: "5",
    imgUrl: `https://ichef.bbci.co.uk/ace/standard/800/cpsprodpb/vivo/live/images/2025/2/11/5035432a-ca70-4659-af3c-6661974a235d.jpg.webp`,
    description: `Defender Ruben Dias says Manchester City can "still achieve something beautiful" and rescue "the most difficult" season.

Pep Guardiola's side host defending champions Real Madrid in the Champions League play-off first leg tonight at 20:00 GMT after finishing 22nd in the group stage.

Victory over the two legs would see City qualify for the last 16 and a tie against either Atletico Madrid or Bayer Leverkusen.

They have also faltered in their Premier League defence and sit fifth, 15 points behind leaders Liverpool.

"This has been the most difficult season since I have been here but I am a firm believer that even in the most difficult moments, you can still achieve something beautiful," said the Portugal centre-back, who is one of City's vice-captains.

"We know how difficult it will be to get through but we have loads of guns in the dressing room. We just have to use them in the right way."`,
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4",
    title: "Man City can still create something beautiful - Dias"
  },
  {
    id: "6",
    imgUrl: `https://ichef.bbci.co.uk/ace/standard/800/cpsprodpb/vivo/live/images/2025/2/11/4e308b10-e52d-4be1-a72a-bbd122cfb252.jpg.webp`,
    description: `This is the big one.

A rejuvenated Everton hosting a Liverpool team who had their first slip in a long, long time.

And it's the final ever Merseyside derby at Goodison Park.

Arne Slot hasn't faced Everton before, with Wednesday's game a rearranged fixture that was supposed to take place in December but was curtailed by Storm Darragh.

The last time these two met was in April, and the Blues overpowered the Reds in a 2-0 win.`,
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4",
    title: "Blue vs Red"
  }
];

export default function HomeScreen() {
  const [activePostId, setActivePostId] = useState(dummyPosts[0].id);
  const [posts, setPosts] = useState<typeof dummyPosts>([]);
  const { height } = useWindowDimensions();
  const { i18n } = useLingui();
  const { top, bottom } = useSafeAreaInsets();
  const { setHideTabBarStatus } = useUserSettingsStore();

  useEffect(() => {
    const fetchPosts = async () => {
      setPosts(dummyPosts);
    };

    fetchPosts();
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: { itemVisiblePercentThreshold: 50 },
      onViewableItemsChanged: ({ changed, viewableItems }: any) => {
        if (viewableItems?.length > 0 && viewableItems?.[0]?.isViewable) {
          setActivePostId(viewableItems?.[0]?.item?.id);
        }
      }
    }
  ]);

  const onEndReached = () => {
    // fetch more posts from database
    setPosts((currentPosts) => [...currentPosts, ...dummyPosts]);
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <Pressable onPress={() => setHideTabBarStatus(false)}>
        <View className=" flex-1 gap-3 justify-between" style={{ height }}>
          <View
            className="flex-1"
            style={{ paddingTop: top, paddingBottom: bottom }}
          >
            <Image
              source={{ uri: item.imgUrl }}
              className="h-[290px]"
              resizeMode="cover"
            />
            <View className="flex-1 gap-4 px-4">
              <Text className="text-foreground font-bold text-lg mt-4">
                {t(i18n)`${item.title}`}
              </Text>
              <Text className="text-foreground text-medium font-medium">
                {t(i18n)`${item.description}`}
              </Text>
              <View className="flex flex-row justify-between items-center gap-2">
                <View className="flex flex-row items-center gap-2">
                  <CalendarClock className="size-5 text-muted-foreground" />
                  <Text className="text-foreground text-xs">
                    {"3 hours ago"}
                  </Text>
                  <Text className="text-muted-foreground text-xs">
                    {`/  ${item?.id} of ${posts.length} Pages`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View className=" flex-1 bg-background">
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        pagingEnabled
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        showsVerticalScrollIndicator={false}
        // onEndReached={onEndReached}
        // onEndReachedThreshold={3}
      />
    </View>
  );
}
