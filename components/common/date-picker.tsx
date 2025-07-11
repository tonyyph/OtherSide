import { useColorPalette } from "@/hooks/use-color-palette";
import { formatDateTimeOnlyYear } from "@/lib/date";
import { sleep } from "@/lib/utils";
import { type BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import { CalendarRangeIcon } from "lucide-react-native";
import { useRef, useState } from "react";
import { Keyboard, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../ui/button";
import { BottomSheet } from "./bottom-sheet";

function SpinnerDatePicker({
  value,
  onChange,
  maximumDate,
  minimumDate
}: {
  value: Date;
  onChange: (date: Date | undefined) => void;
  maximumDate?: Date;
  minimumDate?: Date;
}) {
  const [date, setDate] = useState<Date | undefined>(value);
  const { getColor } = useColorPalette();
  return (
    <View className="gap-4">
      <DateTimePicker
        value={value}
        textColor={getColor("--foreground")}
        mode="date"
        display="spinner"
        style={{ alignSelf: "center" }}
        onChange={(_, selectedDate) => {
          setDate(selectedDate);
        }}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
      />
      <Button
        size={"lg"}
        className="mx-6 rounded-full"
        onPress={() => {
          Haptics.selectionAsync();
          onChange(date);
        }}
      >
        <Text className="text-base font-medium">{`Save`}</Text>
      </Button>
    </View>
  );
}

export function DatePicker({
  value = new Date(),
  onChange,
  maximumDate,
  minimumDate
}: {
  value?: Date;
  onChange?: (date?: Date) => void;
  maximumDate?: Date;
  minimumDate?: Date;
}) {
  const { bottom } = useSafeAreaInsets();
  const sheetRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <Button
        variant="outline"
        onPress={() => {
          Haptics.selectionAsync();
          Keyboard.dismiss();
          sheetRef.current?.present();
        }}
      >
        <CalendarRangeIcon className="size-5 text-foreground" />
        <Text className="text-sm font-regular text-foreground">
          {formatDateTimeOnlyYear?.(value)}
        </Text>
      </Button>
      <BottomSheet ref={sheetRef} index={0} enableDynamicSizing>
        <BottomSheetView
          style={{
            paddingBottom: bottom
          }}
        >
          <SpinnerDatePicker
            value={value}
            onChange={async (date) => {
              sheetRef.current?.close();
              await sleep(500);
              onChange?.(date);
            }}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
          />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
