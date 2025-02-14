import { UserAvatar } from "@/components/common/user-avatar";
import { InputField } from "@/components/form-fields/input-field";
import { SubmitButton } from "@/components/form-fields/submit-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import * as Haptics from "expo-haptics";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Trash2Icon } from "lucide-react-native";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Alert, Pressable, ScrollView, View } from "react-native";
import { z } from "zod";

const zProfileForm = z.object({
  imageUrl: z.string().nullable(),
  fullName: z.string().min(1, "Profile name is required")
});
type ProfileFormValues = z.infer<typeof zProfileForm>;

export default function EditProfileScreen() {
  const { i18n } = useLingui();
  const router = useRouter();
  const user = {
    id: "123",
    fullName: "Tony Phan",
    primaryEmailAddress: {
      emailAddress: "tonyphan@gmail.com"
    },
    imageUrl:
      "https://media.licdn.com/dms/image/v2/C4E0BAQHRcd8MW8NoEQ/company-logo_200_200/company-logo_200_200/0/1631373100497?e=2147483647&v=beta&t=1pTjV_f6c_HEPpm-zTeobA6HYV_YNV4aLrGLGBB0K-w"
  };

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(zProfileForm),
    defaultValues: {
      fullName: user?.fullName ?? "",
      imageUrl: user?.imageUrl ?? null
    }
  });

  async function handlePickImage() {
    Haptics.selectionAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.5
    });
    if (result.canceled) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    const manipResult = await manipulateAsync(
      result.assets[0].uri,
      [
        {
          resize: { width: 512 }
        }
      ],
      {
        compress: 0.5,
        format: SaveFormat.WEBP,
        base64: true
      }
    );
    const base64 = manipResult.base64;
    const imageUrl = base64 ? `data:image/webp;base64,${base64}` : null;
    profileForm.setValue("imageUrl", imageUrl, { shouldDirty: true });
  }

  function onSubmit(data: ProfileFormValues) {
    Alert.alert(t(i18n)`Are you sure you want to change profile?`, "", [
      {
        text: t(i18n)`Cancel`,
        style: "cancel"
      },
      {
        text: t(i18n)`Confirm`,
        style: "destructive",
        onPress: async () => {
          // await signOut()
          // await cancelAllScheduledNotifications()
        }
      }
    ]);
  }

  function handleDeleteAccount() {
    Alert.alert(
      "",
      t(
        i18n
      )`Are you sure you want to delete your account? This action cannot be undone.`,
      [
        {
          text: t(i18n)`Cancel`,
          style: "cancel"
        },
        {
          text: t(i18n)`Delete`,
          style: "destructive",
          onPress: async () => {
            // await mutateDeleteAccount()
          }
        }
      ]
    );
  }

  return (
    <ScrollView className="bg-background" contentContainerClassName="px-6 py-3">
      <FormProvider {...profileForm}>
        <View className="gap-4">
          <Pressable onPress={handlePickImage}>
            <Controller
              name="imageUrl"
              control={profileForm.control}
              render={({ field: { value } }) => (
                <UserAvatar
                  user={{
                    ...user!,
                    imageUrl: value!
                  }}
                  className="h-20 w-20"
                />
              )}
            />
          </Pressable>
          <View className=" flex-1 bg-background mb-2">
            <Text className="text-base font-extrabold text-foreground mb-1">
              {t(i18n)`Avatar`}
            </Text>
            <View className="flex-row items-center gap-2">
              <Button variant="secondary" size="sm" onPress={handlePickImage}>
                <Text>{t(i18n)`Upload new photo`}</Text>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                disabled={!user?.imageUrl}
                onPress={() =>
                  profileForm.setValue("imageUrl", null, { shouldDirty: true })
                }
              >
                <Trash2Icon className="h-5 w-5 text-foreground" />
              </Button>
            </View>
          </View>
          <InputField
            name="fullName"
            label={t(i18n)`Display name`}
            placeholder={t(i18n)`Your display name`}
            autoCapitalize="words"
            disabled={profileForm.formState.isLoading}
          />
          <SubmitButton
            className="self-start"
            onPress={profileForm.handleSubmit(onSubmit)}
            disabled={
              profileForm.formState.isLoading || !profileForm.formState.isDirty
            }
          >
            <Text>{t(i18n)`Save changes`}</Text>
          </SubmitButton>
        </View>
      </FormProvider>
      <Separator className="mt-20 mb-4" />
      <View className="gap-3">
        <Text className="font-medium text-base text-foreground">
          {t(i18n)`Danger zone`}
        </Text>
        <Button
          onPress={handleDeleteAccount}
          disabled={false}
          variant="destructive-outline"
          size="sm"
          className="self-start"
        >
          <Text>{t(i18n)`Delete account`}</Text>
        </Button>
        <Text className="mb-4 text-muted-foreground text-sm">
          {t(i18n)`All your data will be deleted`}
        </Text>
      </View>
    </ScrollView>
  );
}
