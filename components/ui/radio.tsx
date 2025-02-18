import { TouchableOpacity } from "react-native";
import { memoFC } from "@/utils";
import { RadioNonSelectedIcon, RadioSelectedIcon } from "../common/icons";

type Props = {
  selected: boolean;
  onPress: () => void;
};
export const Radio = memoFC(({ selected, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {selected ? <RadioSelectedIcon /> : <RadioNonSelectedIcon />}
    </TouchableOpacity>
  );
});
