import { CategoryItem } from "@/components/category/category-item";
import { AddNewButton } from "@/components/common/add-new-button";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Link, useNavigation, useRouter } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { useEffect } from "react";
import { SectionList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CategoriesScreen() {
  const { i18n } = useLingui();
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Link href={"/"} asChild>
          <Button size="icon" variant="ghost">
            <PlusIcon className="size-6 text-foreground" />
          </Button>
        </Link>
      )
    });
  }, []);

  const sections = [
    { key: "EXPLORE", title: `Explore`, data: [] },
    { key: "TOPIC", title: `Topic`, data: [] }
  ];

  return (
    <SectionList
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: bottom }}
      refreshing={false}
      sections={sections}
      // keyExtractor={(item) => item?.id as any}
      renderItem={({ item: category }) => <CategoryItem category={category} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text className="mx-6 bg-background py-2 text-muted-foreground">
          {title}
        </Text>
      )}
      renderSectionFooter={({ section }) => (
        <>
          {!section.data.length &&
            (true ? (
              <>
                <Skeleton className="mx-6 mt-3 mb-5 h-4 rounded-full" />
                <Skeleton className="mx-6 mt-3 mb-5 h-4 rounded-full" />
                <Skeleton className="mx-6 mt-3 mb-5 h-4 rounded-full" />
              </>
            ) : (
              <Text className="mt-6 mb-9 text-center text-muted-foreground">
                {`empty`}
              </Text>
            ))}
          <AddNewButton
            label={`New ${section.key.toLowerCase()}`}
            // onPress={() =>
            //   router.push({
            //     pathname: "/category/new-category",
            //     params: { type: section.key }
            //   })
            // }
            className="mb-6"
          />
        </>
      )}
    />
  );
}
