import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import React, { forwardRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../ui/button";

const InfoBottomSheet = forwardRef(
  ({}: any, ref: React.Ref<BottomSheetModalMethods>) => {
    console.log(" ref:", ref);

    const { i18n } = useLingui();
    const { bottom } = useSafeAreaInsets();
    return (
      <BottomSheet ref={ref} index={0} enableDynamicSizing>
        <BottomSheetView style={{ paddingBottom: bottom }}>
          <View className="p-4">
            <View className="items-center mb-5 px-6 pb-4">
              <Image
                source={require("@/assets/images/warning.png")}
                className="w-[64px] h-[64px] self-center mb-4"
              />
              <Text className="!text-xl !text-white mb-2 font-semiBold text-center">
                Invalid email or password
              </Text>
              <Text className="!text-lg !text-foreground mb-2 text-center">
                Your email or password is incorrect. Please check and try again.
              </Text>
            </View>
            <Button
              variant="default"
              className="rounded-full mx-4"
              onPress={() => {}}
            >
              <Text className="text-white text-base font-medium">
                {t(i18n)`Try again`}
              </Text>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default InfoBottomSheet;

const styles = StyleSheet.create({});
