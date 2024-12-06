import Button from "@/components/button";
import Text from "@/components/text";
import React from "react";
import { useFormState } from "./form";

export type SegmentedInputOption<T> = {
  label: string;
  value: T;
};

export type SegmentedInputRef<T> = {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
};

export interface SegmentedInputProps<T> {
  label?: string;
  options: SegmentedInputOption<T>[];
}

const SegmentedInput = React.forwardRef(
  <T extends string = string>(
    props: SegmentedInputProps<T>,
    ref: React.Ref<SegmentedInputRef<T>>
  ) => {
    const { options, label } = props;
    const [value, setValue] = React.useState<any>("");
    React.useImperativeHandle(ref, () => ({
      value,
      setValue,
    }));
    const formState = useFormState();
    return (
      <div>
        {label && (
          <Text variant="label" className="mb-2">
            {label}
          </Text>
        )}
        <div className="flex gap-2 items-center w-full md:w-[30%]">
          {options.map((option) => (
            <Button
              type="button"
              className="flex-1"
              key={option.value}
              variant={value === option.value ? "primary" : "secondary"}
              onClick={() => {
                if (formState.isSubmitting) return;
                if (formState.disabled) return;
                setValue(option.value);
              }}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    );
  }
);

SegmentedInput.displayName = "SegmentedInput";

export default SegmentedInput;
