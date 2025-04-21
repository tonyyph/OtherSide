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
  onClose?: () => void;
  isVisible?: boolean;
  content?: string;
};

const Tooltip: React.FC<TouchableOpacityProps & Props> = (props) => {
  const { isVisible = false } = props;
  const [showToolTip, setShowTooltip] = useState<boolean>(isVisible);
  const timeoutRef = React.useRef<any>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleToolTip = useCallback(() => {
    setShowTooltip(!showToolTip);
    if (!showToolTip) {
      timeoutRef.current = setTimeout(() => {
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
      backgroundColor="rgba(0,0,0,0.75))"
      contentStyle={styles.tooltip}
      placement="bottom"
      onClose={() => {
        props?.onClose && props?.onClose();
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
  container: {
    flex: 1
  },
  tooltip: {
    flex: 1,
    backgroundColor: "#525252",
    borderRadius: exactDesign(8)
  }
});
