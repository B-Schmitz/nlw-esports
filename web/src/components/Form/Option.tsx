import * as Select from "@radix-ui/react-select";
import { CaretLeft } from "phosphor-react";
import { OptionHTMLAttributes } from "react";

interface SelectProps extends OptionHTMLAttributes<HTMLInputElement> {
  value: string;
  text: string;
}

export default function Option({ value, text, ...rest }: SelectProps) {
  return (
    <Select.SelectItem
      {...rest}
      value={value}
      className="flex items-center gap-2 p-1 rounded justify-between hover:bg-violet-500/50 cursor-pointer"
    >
      <Select.SelectItemText>{text}</Select.SelectItemText>
      <Select.SelectItemIndicator className="items-center justify-center">
        <CaretLeft weight="fill" />
      </Select.SelectItemIndicator>
    </Select.SelectItem>
  );
}
