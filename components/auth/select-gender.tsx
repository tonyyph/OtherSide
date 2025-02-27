import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { cssInterop } from "nativewind";
import { Dropdown } from "react-native-element-dropdown";
import { useLingui } from "@lingui/react";
import { t } from "@lingui/macro";

cssInterop(Dropdown, {
  className: {
    target: "style"
  }
});

const GenderPicker = () => {
  const [selectedGender, setSelectedGender] = useState<string | undefined>();
  const [isFocus, setIsFocus] = useState(false);

  const { i18n } = useLingui();

  const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
  ];

  return (
    <View className="my-1 flex-1">
      <Text className="text-sm font-medium text-foreground mb-1">
        Gender{" "}
        <Text className="font-regular text-red-400 group-active:text-red-400">
          *
        </Text>
      </Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#222426" }]}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={{ color: "gray", fontSize: 14 }}
        iconStyle={{ left: 8 }}
        data={genders}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select gender" : "..."}
        value={selectedGender}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setSelectedGender(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center"
  },
  dropdown: {
    height: 48,
    borderColor: "#222426",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 20,
    flex: 1
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "white"
  }
});

export default GenderPicker;
