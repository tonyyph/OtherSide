export enum Palette {
  Default = "default",
  TokyoNight = "tokyo-night",
  WinterIsComing = "winter-is-coming",
  Catppuccin = "catppuccin",
  RosePine = "rose-pine"
}

export type ColorKey =
  | "--background"
  | "--foreground"
  | "--muted"
  | "--muted-foreground"
  | "--popover"
  | "--popover-foreground"
  | "--input"
  | "--border"
  | "--card"
  | "--card-foreground"
  | "--primary"
  | "--primary-foreground"
  | "--secondary"
  | "--secondary-foreground"
  | "--accent"
  | "--accent-foreground"
  | "--destructive"
  | "--destructive-foreground"
  | "--ring";

export type SpacingKey = "--radius";

export type VariableKey = ColorKey | SpacingKey;

export const themeVariables: Record<
  Palette,
  Record<"light" | "dark", Partial<Record<VariableKey, string>>>
> = {
  [Palette.Default]: {
    light: {
      "--background": "0 0% 100%",
      "--foreground": "240 6% 10%",
      "--muted": "210 40% 96.1%",
      "--muted-foreground": "240 4% 46%",
      "--popover": "0 0% 100%",
      "--popover-foreground": "222.2 47.4% 11.2%",
      "--input": "249 6% 90%",
      "--border": "249 6% 90%",
      "--card": "0 0% 100%",
      "--card-foreground": "222.2 47.4% 11.2%",
      "--primary": "240 6% 10%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "210 40% 96.1%",
      "--secondary-foreground": "222.2 47.4% 11.2%",
      "--accent": "210 40% 96.1%",
      "--accent-foreground": "222.2 47.4% 11.2%",
      "--destructive": "0 100% 50%",
      "--destructive-foreground": "210 40% 98%",
      "--ring": "215 20.2% 65.1%",
      "--radius": "0.5rem"
    },
    dark: {
      "--background": "240 9% 4%",
      "--foreground": "0 0% 90%",
      "--muted": "240 5% 19%",
      "--muted-foreground": "228 6% 68%",
      "--accent": "240 5% 19%",
      "--accent-foreground": "0 0% 98%",
      "--popover": "240 9% 4%",
      "--popover-foreground": "0 0% 98%",
      "--border": "240 6% 14%",
      "--input": "240 6% 14%",
      "--card": "240 9% 4%",
      "--card-foreground": "0 0% 90%",
      "--primary": "174 72% 56%",
      "--primary-foreground": "240 9% 4%",
      "--secondary": "240 6% 14%",
      "--secondary-foreground": "0 0% 98%",
      "--destructive": "0 63% 31%",
      "--destructive-foreground": "0 0% 98%",
      "--ring": "240 6% 14%",
      "--radius": "0.5rem"
    }
  },
  [Palette.WinterIsComing]: {
    light: {
      "--background": "0 0% 100%",
      "--foreground": "211 69% 44%",
      "--muted": "0 12% 90%",
      "--muted-foreground": "0 12% 30%",
      "--popover": "0 0% 97%",
      "--popover-foreground": "211 69% 34%",
      "--card": "0 0% 98%",
      "--card-foreground": "211 69% 39%",
      "--border": "0 0% 95%",
      "--input": "0 0% 92%",
      "--primary": "0 0% 17%",
      "--primary-foreground": "0 0% 77%",
      "--secondary": "0 0% 75%",
      "--secondary-foreground": "0 0% 15%",
      "--accent": "0 0% 85%",
      "--accent-foreground": "0 0% 25%",
      "--destructive": "5 80% 33%",
      "--destructive-foreground": "5 80% 93%",
      "--ring": "0 0% 17%",
      "--radius": "0.5rem"
    },
    dark: {
      "--background": "60 8% 15%",
      "--foreground": "201 83% 81%",
      "--muted": "60 12% 19%",
      "--muted-foreground": "60 12% 69%",
      "--popover": "60 8% 12%",
      "--popover-foreground": "201 83% 91%",
      "--card": "60 8% 13%",
      "--card-foreground": "201 83% 86%",
      "--border": "0 0% 20%",
      "--input": "0 0% 23%",
      "--primary": "205 85% 78%",
      "--primary-foreground": "205 85% 18%",
      "--secondary": "205 30% 25%",
      "--secondary-foreground": "205 30% 85%",
      "--accent": "60 8% 30%",
      "--accent-foreground": "60 8% 90%",
      "--destructive": "7 98% 49%",
      "--destructive-foreground": "0 0% 100%",
      "--ring": "205 85% 78%",
      "--radius": "0.5rem"
    }
  },
  [Palette.TokyoNight]: {
    light: {
      "--background": "230 8% 85%",
      "--foreground": "229 26% 28%",
      "--muted": "230 12% 81%",
      "--muted-foreground": "230 12% 21%",
      "--popover": "230 8% 82%",
      "--popover-foreground": "229 26% 18%",
      "--card": "230 8% 83%",
      "--card-foreground": "229 26% 23%",
      "--border": "0 0% 80%",
      "--input": "0 0% 77%",
      "--primary": "223 42% 57%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "223 30% 75%",
      "--secondary-foreground": "223 30% 15%",
      "--accent": "230 8% 70%",
      "--accent-foreground": "230 8% 10%",
      "--destructive": "2 82% 30%",
      "--destructive-foreground": "2 82% 90%",
      "--ring": "223 42% 57%",
      "--radius": "0.5rem"
    },
    dark: {
      "--background": "235 19% 13%",
      "--foreground": "229 35% 75%",
      "--muted": "235 12% 17%",
      "--muted-foreground": "235 12% 67%",
      "--popover": "235 19% 10%",
      "--popover-foreground": "229 35% 85%",
      "--card": "235 19% 11%",
      "--card-foreground": "229 35% 80%",
      "--border": "235 9% 18%",
      "--input": "235 9% 21%",
      "--primary": "223 45% 44%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "223 30% 75%",
      "--secondary-foreground": "223 30% 15%",
      "--accent": "235 19% 28%",
      "--accent-foreground": "235 19% 88%",
      "--destructive": "9 82% 45%",
      "--destructive-foreground": "0 0% 100%",
      "--ring": "223 45% 44%",
      "--radius": "0.5rem"
    }
  },
  [Palette.Catppuccin]: {
    light: {
      "--background": "220 23% 95%",
      "--foreground": "234 16% 35%",
      "--muted": "220 12% 90%",
      "--muted-foreground": "220 12% 30%",
      "--popover": "220 23% 92%",
      "--popover-foreground": "234 16% 25%",
      "--card": "220 23% 93%",
      "--card-foreground": "234 16% 30%",
      "--border": "220 13% 90%",
      "--input": "220 13% 87%",
      "--primary": "266 85% 58%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "266 30% 75%",
      "--secondary-foreground": "266 30% 15%",
      "--accent": "220 23% 80%",
      "--accent-foreground": "220 23% 20%",
      "--destructive": "3 87% 37%",
      "--destructive-foreground": "3 87% 97%",
      "--ring": "266 85% 58%",
      "--radius": "0.5rem"
    },
    dark: {
      "--background": "240 21% 15%",
      "--foreground": "226 64% 88%",
      "--muted": "240 12% 19%",
      "--muted-foreground": "240 12% 69%",
      "--popover": "240 21% 12%",
      "--popover-foreground": "226 64% 98%",
      "--card": "240 21% 13%",
      "--card-foreground": "226 64% 93%",
      "--border": "240 11% 20%",
      "--input": "240 11% 23%",
      "--primary": "267 84% 81%",
      "--primary-foreground": "267 84% 21%",
      "--secondary": "267 30% 25%",
      "--secondary-foreground": "267 30% 85%",
      "--accent": "240 21% 30%",
      "--accent-foreground": "240 21% 90%",
      "--destructive": "8 96% 56%",
      "--destructive-foreground": "0 0% 100%",
      "--ring": "267 84% 81%",
      "--radius": "0.5rem"
    }
  },
  [Palette.RosePine]: {
    light: {
      "--background": "32 57% 95%",
      "--foreground": "248 19% 40%",
      "--muted": "32 12% 90%",
      "--muted-foreground": "32 12% 30%",
      "--popover": "32 57% 92%",
      "--popover-foreground": "248 19% 30%",
      "--card": "32 57% 93%",
      "--card-foreground": "248 19% 35%",
      "--border": "32 47% 90%",
      "--input": "32 47% 87%",
      "--primary": "248 19% 40%",
      "--primary-foreground": "248 19% 100%",
      "--secondary": "248 9% 75%",
      "--secondary-foreground": "248 9% 15%",
      "--accent": "32 57% 80%",
      "--accent-foreground": "32 57% 20%",
      "--destructive": "6 95% 20%",
      "--destructive-foreground": "6 95% 80%",
      "--ring": "248 19% 40%",
      "--radius": "0.5rem"
    },
    dark: {
      "--background": "249 22% 12%",
      "--foreground": "245 50% 91%",
      "--muted": "249 12% 16%",
      "--muted-foreground": "249 12% 66%",
      "--popover": "249 22% 9%",
      "--popover-foreground": "0 0% 100%",
      "--card": "249 22% 10%",
      "--card-foreground": "245 50% 96%",
      "--border": "249 12% 17%",
      "--input": "249 12% 20%",
      "--primary": "245 50% 91%",
      "--primary-foreground": "245 50% 31%",
      "--secondary": "245 30% 25%",
      "--secondary-foreground": "245 30% 85%",
      "--accent": "249 22% 27%",
      "--accent-foreground": "249 22% 87%",
      "--destructive": "1 80% 60%",
      "--destructive-foreground": "0 0% 100%",
      "--ring": "245 50% 91%",
      "--radius": "0.5rem"
    }
  }
};
