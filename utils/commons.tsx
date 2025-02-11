import { ComponentType, memo, MemoExoticComponent } from "react";
import fastCompare from "react-fast-compare";
import { Dimensions, Text } from "react-native";

export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const SCREEN_WIDTH = Dimensions.get("window").width;
export const scaleOnHeight = (value: number) => (SCREEN_HEIGHT / 845) * value;
export const scaleOnWidth = (value: number) => (SCREEN_WIDTH / 390) * value;

export function memoFC<T extends ComponentType<any>>(
  component: T,
  ignoreProps?: string[]
): MemoExoticComponent<T> {
  return memo(component, (prev, next) => {
    if (ignoreProps?.length) {
      const prevProps = { ...prev };
      const nextProps = { ...next };
      ignoreProps.forEach((prop) => {
        // @ts-ignore
        delete prevProps[prop];
        // @ts-ignore
        delete nextProps[prop];
      });
      return fastCompare(prevProps, nextProps);
    }
    return fastCompare(prev, next);
  });
}

export const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
