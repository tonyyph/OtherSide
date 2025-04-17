import { cn } from "@/lib/utils";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { FilterIcon } from "lucide-react-native";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";

export enum ArticleFilter {
  All = "all",
  ByEditing = "editing",
  ByLive = "live",
  ByOffline = "offline"
}

type SelectFilterProps = {
  value?: ArticleFilter;
  onSelect?: (type: ArticleFilter) => void;
};

export function SelectFilter({
  value = ArticleFilter.All,
  onSelect
}: SelectFilterProps) {
  const { i18n } = useLingui();

  const options = [
    {
      value: ArticleFilter.All,
      label: `All`
    },
    {
      value: ArticleFilter.ByEditing,
      label: `Editing`
    },
    {
      value: ArticleFilter.ByLive,
      label: `Live`
    },
    {
      value: ArticleFilter.ByOffline,
      label: `Offline`
    }
  ];

  return (
    <Select
      value={options.find((option) => option.value === value) ?? options[0]}
      onValueChange={(selected) => {
        onSelect?.(selected?.value as ArticleFilter);
      }}
    >
      <SelectTrigger
        hideArrow
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        className={cn(
          "!h-10 !px-2.5 flex-row items-center gap-2 bg-white",
          value !== ArticleFilter.All && ""
        )}
      >
        <FilterIcon
          className={cn(
            "h-5 w-5 text-black",
            value !== ArticleFilter.All && "text-primary-foreground"
          )}
        />
        {value !== ArticleFilter.All && (
          <SelectValue
            className={cn("font-semiBold text-primary-foreground")}
            placeholder={t(i18n)`All Accounts`}
          >
            {value}
          </SelectValue>
        )}
      </SelectTrigger>
      <SelectContent sideOffset={6} align="end">
        <SelectGroup className="max-w-[260px] px-1">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              label={option.label}
              className="flex-row items-center justify-between"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
