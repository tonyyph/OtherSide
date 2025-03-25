import { exactDesign } from "@/utils";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";
import Tooltips from "react-native-walkthrough-tooltip";
import { Text } from "./text";

type Props = {
  tootTipContent?: ReactNode;
  content?: string;
};

const Tooltip: React.FC<TouchableOpacityProps & Props> = (props) => {
  const [showToolTip, setShowTooltip] = useState<boolean>(false);
  let timeout: any = null;

  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  const handleToolTip = useCallback(() => {
    setShowTooltip(!showToolTip);
    if (!showToolTip) {
      timeout = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }
  }, [showToolTip]);
  return (
    <Tooltips
      isVisible={showToolTip}
      content={
        props?.tootTipContent ? (
          <>{props.tootTipContent}</>
        ) : (
          <Text className="color-white text-bs">
            {props.content ?? "Check this out!"}
          </Text>
        )
      }
      backgroundColor="rgba(0,0,0,0.5)"
      contentStyle={styles.tooltip}
      placement="top"
      onClose={() => {
        setShowTooltip(false);
      }}
    >
      <TouchableOpacity
        style={styles.container}
        {...props}
        onPress={handleToolTip}
        activeOpacity={1}
      >
        {props.children}
      </TouchableOpacity>
    </Tooltips>
  );
};
export default Tooltip;

const styles = StyleSheet.create({
  container: {},
  tooltip: {
    backgroundColor: "#525252",
    borderRadius: exactDesign(8)
  }
});
