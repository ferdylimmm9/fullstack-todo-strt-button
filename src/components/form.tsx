import React from "react";

interface FormProps extends React.ComponentProps<"form"> {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  defaultEditable?: boolean;
}

export type FormStateContextType = {
  disabled: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
};

export type FormStateRef = FormStateContextType;

export const FormStateContext = React.createContext<FormStateContextType>({
  disabled: false,
  setDisabled() {},
  isSubmitting: false,
  setIsSubmitting() {},
});

const Form = React.forwardRef<FormStateRef, FormProps>((props, ref) => {
  const { defaultEditable = true, ...rest } = props;
  const [disabled, setDisabled] = React.useState(defaultEditable == false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const values = React.useMemo(() => {
    return { disabled, setDisabled, isSubmitting, setIsSubmitting };
  }, [disabled, isSubmitting]);

  React.useImperativeHandle(ref, () => ({
    disabled,
    isSubmitting,
    setDisabled,
    setIsSubmitting,
  }));

  return (
    <FormStateContext.Provider value={values}>
      <form
        {...rest}
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit?.(e);
        }}
      />
    </FormStateContext.Provider>
  );
});

Form.displayName = "Form";

export default Form;

export function useFormState() {
  const context = React.useContext(FormStateContext);
  return context;
}
