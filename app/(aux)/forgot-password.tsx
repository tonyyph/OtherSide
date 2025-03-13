import { BottomSheet } from "@/components/common/bottom-sheet";
import { KeyboardSpacer } from "@/components/common/keyboard-spacer";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { debounce } from "lodash";
import { MailIcon, SquareAsterisk, User } from "lucide-react-native";
import { useRef } from "react";
import { Image, Keyboard, ScrollView, TextInput, View } from "react-native";

export default function ForgotPasswordScreen() {
  const { onForgotPassword, emailState, registerSuccess } = useForgotPassword();
  const sheetRef = useRef<BottomSheetModal>(null);

  if (!!registerSuccess) {
    return (
      <View className=" flex-1 bg-background justify-center mb-4 gap-8 p-8">
        <MailIcon className="absolute top-36 right-0  size-80 text-muted-foreground opacity-35" />
        <Text className="font-bold text-[20px] text-muted-foreground text-center mt-8 justify-center">
          Success! We've sent you an email. Please check your inbox and follow
          the instructions to proceed.
        </Text>
        <Button
          variant="default"
          size={"lg"}
          className="rounded-full mx-2"
          disabled={!emailState.value}
          onPress={() => {
            router.back();
          }}
        >
          <Text className="text-background text-base font-medium">
            {`Go back`}
          </Text>
        </Button>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="bg-bg-background"
        scrollEnabled={false}
        contentContainerClassName="gap-4 p-8 justify-between flex-1"
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome */}
        <View className="justify-between">
          <View className="z-10">
            <View className="gap-2">
              <Text className="font-bold text-[40px] text-muted-foreground">
                Forgot
              </Text>
              <Text className="font-bold text-[40px] text-primary">
                Password?
              </Text>
              <Text className="text-muted-foreground text-[16px]">
                Don’t worry! it happens. Please enter the address associated
                with your account.
              </Text>
            </View>
          </View>
          {/* Illustration */}
          <SquareAsterisk className="absolute top-16 right-0 size-80 text-muted-foreground opacity-30" />
          {/* Input Field */}
          <View className="justify-end">
            <View className="flex-col gap-3">
              {/* Username Field */}
              <View className="mt-4">
                <Text className="text-sm font-medium text-foreground mb-1">
                  Email Address{" "}
                  <Text className="font-regular text-red-400 group-active:text-red-400">
                    *
                  </Text>
                </Text>
                <View className="border-2 border-border rounded-lg relative">
                  <TextInput
                    className="pl-10 pr-4 rounded-lg bg-background h-12 text-white"
                    placeholder={`Enter your email address`}
                    placeholderTextColor={"gray"}
                    autoCapitalize="none"
                    value={emailState.value}
                    onChangeText={emailState.onChangeText}
                  />
                  <View className="absolute top-3.5 left-3">
                    <User className="size-5 text-muted-foreground" />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* Submit Button */}
        <Button
          variant="default"
          size={"lg"}
          className="rounded-full mb-10"
          disabled={!emailState.value}
          onPress={debounce(() => {
            onForgotPassword(sheetRef);
            Keyboard.dismiss();
          }, 500)}
        >
          <Text className="text-background text-base font-medium">
            {`Submit`}
          </Text>
        </Button>
      </ScrollView>
      <KeyboardSpacer />

      <BottomSheet ref={sheetRef} index={0} enableDynamicSizing>
        <BottomSheetView>
          <View className="p-4">
            <View className="items-center mb-5 px-6 pb-4">
              <Image
                source={require("@/assets/images/warning.png")}
                className="w-[64px] h-[64px] self-center mb-4"
              />
              <Text className="!text-xl !text-white mb-2 font-semiBold text-center">
                Not found
              </Text>
              <Text className="!text-lg !text-foreground mb-2 mx-4 text-center">
                We couldn't find an account associated with the username or
                email address you entered.
              </Text>
            </View>
            <Button
              variant="default"
              className="rounded-full mx-4 mb-8"
              onPress={() => {
                sheetRef?.current?.close();
              }}
            >
              <Text className="text-background text-base font-medium">
                {`Try again`}
              </Text>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
