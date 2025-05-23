import { sleep } from "@/lib/utils";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import { Trash2Icon } from "lucide-react-native";
import { useRef } from "react";
import {
  Controller,
  FormProvider,
  type UseFormReturn,
  useController,
  useWatch
} from "react-hook-form";
import { ScrollView, View } from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle
} from "react-native-reanimated";
import { BottomSheet } from "../common/bottom-sheet";
import { CurrencySheetList } from "../common/currency-sheet";
import { DatePicker } from "../common/date-picker";
import { InputField } from "../form-fields/input-field";
import { SubmitButton } from "../form-fields/submit-button";
import { NumericPad } from "../numeric-pad";
import { TextTicker } from "../text-ticker";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

type CommentFormProps = {
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  onDelete?: () => void;
  onOpenScanner?: () => void;
  form: UseFormReturn<any>;
  sideOffset?: number;
};

export function TransactionAmount() {
  const sheetRef = useRef<BottomSheetModal>(null);
  const [amount] = useWatch({ name: ["amount"] });
  const {
    field: { onChange, value: currency }
  } = useController({ name: "currency" });

  return (
    <>
      <TextTicker
        value={amount}
        className="text-center text-6xl text-foreground leading-tight"
        suffix={currency}
        suffixClassName="ml-2 text-muted-foreground overflow-visible"
        onPressSuffix={() => {
          Haptics.selectionAsync();
          sheetRef.current?.present();
        }}
      />
      <BottomSheet ref={sheetRef} index={0} enableDynamicSizing>
        <CurrencySheetList
          value={currency}
          onSelect={async (selected) => {
            sheetRef.current?.close();
            await sleep(500);
            onChange?.(selected.code);
          }}
        />
      </BottomSheet>
    </>
  );
}

function FormSubmitButton({
  form,
  onSubmit
}: {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
}) {
  const amount = useWatch({ name: "amount" });

  return (
    <SubmitButton
      onPress={form.handleSubmit(onSubmit)}
      onPressIn={Haptics.selectionAsync}
      disabled={form.formState.isLoading || !amount}
      className="flex-shrink-0"
    >
      <Text>{`Save`}</Text>
    </SubmitButton>
  );
}

export const CommentForm = ({
  form,
  onSubmit,
  // onCancel,
  onDelete,
  // onOpenScanner,
  sideOffset
}: CommentFormProps) => {
  const keyboard = useAnimatedKeyboard();
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: keyboard.height.value }]
    };
  });

  return (
    <FormProvider {...form}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets
        contentContainerClassName="flex-1 justify-between bg-muted"
        bounces={false}
      >
        <View className="flex-row items-center justify-between p-4 pb-0">
          {/* <Button size="icon" variant="secondary" onPress={onCancel}>
            <XIcon className="size-6 text-primary" />
          </Button> */}
          <View className="flex-row items-center gap-2">
            <Controller
              name="date"
              control={form.control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  value={value}
                  onChange={onChange}
                  minimumDate={new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)}
                  maximumDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}
                />
              )}
            />
          </View>
          <View className="flex-row items-center gap-4">
            {onDelete ? (
              <Button size="icon" variant="secondary" onPress={onDelete}>
                <Trash2Icon className="size-5 text-secondary-foreground" />
              </Button>
            ) : null}
          </View>
        </View>
        <View className="flex-1 items-center justify-center pb-12">
          <View className="mb-2 h-24 w-full justify-end">
            <TransactionAmount />
          </View>
          <Controller
            name="budgetId"
            control={form.control}
            render={({ field: { onChange, value } }) => <Text>1234</Text>}
          />
          <InputField
            name="note"
            placeholder={`transaction note`}
            autoCapitalize="none"
            className="line-clamp-1 h-8 truncate border-0 bg-transparent"
            placeholderClassName="!text-muted"
            wrapperClassName="absolute left-4 right-4 bottom-4"
            numberOfLines={1}
            multiline={false}
          />
        </View>
        <Animated.View style={translateStyle}>
          <View className="flex-row items-center justify-between gap-3 border-border border-t bg-background p-2">
            <View className="flex-1 flex-shrink flex-row items-center gap-2"></View>
            <FormSubmitButton form={form} onSubmit={onSubmit} />
          </View>
          <Controller
            name="amount"
            control={form.control}
            render={({ field: { onChange, value } }) => (
              <NumericPad value={value} onValueChange={onChange} />
            )}
          />
        </Animated.View>
      </ScrollView>
    </FormProvider>
  );
};
