import { MenuItem } from "@/components/common/menu-item";
import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile";
import { useLocale } from "@/locales/provider";
import { CheckIcon } from "lucide-react-native";
import { ScrollView } from "react-native";

export default function LanguageScreen() {
  const { language, setLanguage } = useLocale();
  const { languageState } = useUpdateProfile();

  return (
    <ScrollView className="bg-background">
      <MenuItem
        label={`English`}
        rightSection={
          language === "en" && (
            <CheckIcon className="size-6 text-amount-positive" />
          )
        }
        onPress={() => {
          setLanguage("en");
          languageState.onChangeText("en");
        }}
      />
      <MenuItem
        label={`Hindi`}
        rightSection={
          language === "hi" && (
            <CheckIcon className="size-6 text-amount-positive" />
          )
        }
        onPress={() => {
          setLanguage("hi");
          languageState.onChangeText("hi");
        }}
      />
      <MenuItem
        label={`Telugu`}
        rightSection={
          language === "te" && (
            <CheckIcon className="size-6 text-amount-positive" />
          )
        }
        onPress={() => {
          setLanguage("te");
          languageState.onChangeText("te");
        }}
      />
    </ScrollView>
  );
}
