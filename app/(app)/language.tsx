import { MenuItem } from "@/components/common/menu-item";
import { useLocale } from "@/locales/provider";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useRouter } from "expo-router";
import { CheckIcon } from "lucide-react-native";
import { ScrollView } from "react-native";

export default function LanguageScreen() {
  const { i18n } = useLingui();
  const { language, setLanguage } = useLocale();
  const router = useRouter();

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
          router.back();
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
          router.back();
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
          router.back();
        }}
      />
    </ScrollView>
  );
}
