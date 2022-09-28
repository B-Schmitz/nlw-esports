import React, { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { EnumErrorMessageText } from "../../utils/enums/EnumErrorMessage";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | undefined;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <>
      <input
        ref={ref}
        className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 focus: border-violet-500 focus:border-2  !outline-none ${
          props.error && "border-red-500 border-2"
        }`}
        {...props}
      />
      {props.error && (
        <p className="ml-1 text-xs text-red-500">{EnumErrorMessageText.get(props.error.type)}</p>
      )}
    </>
  );
});

export default Input;
