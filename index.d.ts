type TextCustomColor =
  | "typo-primary"
  | "typo-subtitle"
  | "typo-disable"
  | "typo-quaternary"
  | "typo-link-button"
  | "typo-warning"
  | "typo-success";
type BackgroundCustomColor =
  | "brand-blue"
  | "main-background"
  | "sub-background"
  | "transparent-background"
  | "gray-background"
  | "badge-4-background"
  | "badge-3-background"
  | "badge-2-background"
  | "badge-1-background"
  | "white-background";

type StatusCustomColor =
  | "status-status-neutral-icon-line"
  | "status-error-icon"
  | "status-success-icon"
  | "status-warning-icon"
  | "status-warning-background"
  | "status-error-background"
  | "status-success-background"
  | "status-neutral-background";

type BorderCustomColor = "full-bleed" | "full-bleed-2";

type BasicColor = "black" | "white" | "transparent" | "current" | "inherit";
type ColorKey = Exclude<
  keyof import("tailwindcss/types/generated/colors").DefaultColors,
  BasicColor
>;
type ColorVariant =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950";
type ColorName =
  | `${ColorKey}-${ColorVariant}`
  | BasicColor
  | TextCustomColor
  | BackgroundCustomColor
  | StatusCustomColor;
type IconProps = {
  size?: number;
  color?: ColorKey;
  filled?: boolean;
  iconColor?: string;
} & import("react-native-svg").SvgProps;
type IconName = import("./components/commons").IconNameType;

declare type NavigationProps<T extends keyof NavigationStackParamList> =
  ScreenProps<T>["navigation"];
