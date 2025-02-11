import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link, useNavigation } from "expo-router";
import * as Haptics from "expo-haptics";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Search } from "lucide-react-native";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Input } from "@/components/ui/input";
import { SearchBar } from "@/components/common/search-bar";

const search = () => {
  const { i18n } = useLingui();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: top }}>
      <SearchBar />
    </View>
  );
};

export default search;

const styles = StyleSheet.create({});
