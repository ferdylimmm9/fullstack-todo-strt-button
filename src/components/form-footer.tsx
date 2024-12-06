import { FaPen, FaTrash } from "react-icons/fa";
import { GrClose, GrSave } from "react-icons/gr";
import Button, { ButtonProps } from "./button";
import { useFormState } from "./form";
import SubmitButton from "./submit-button";

interface FormFooterProps {
  buttonDelete?: ButtonProps;
  buttonSubmit?: ButtonProps;
  buttonCancel?: ButtonProps;
  buttonEdit?: ButtonProps;
  isEdit?: boolean;
}

const iconClassname = "w-5 h-5";

export default function FormFooter(props: FormFooterProps) {
  const formState = useFormState();

  return (
    <div className="flex gap-2 justify-end fixed bottom-0 left-0 right-0 p-4 bg-white">
      {formState.disabled === false && formState.isSubmitting === false && props.isEdit && (
        <Button
          {...props.buttonCancel}
          type="button"
          variant="secondary"
          className="flex-1"
          onClick={(e) => {
            props.buttonCancel?.onClick?.(e);
            formState.setDisabled(true);
          }}
          leftSection={<GrClose className={iconClassname} />}
        >
          Cancel
        </Button>
      )}
      {formState.disabled === false && (
        <SubmitButton
          className="flex-1"
          leftSection={<GrSave className={iconClassname} />}
        >
          Save
        </SubmitButton>
      )}
      {formState.disabled === true && props.buttonDelete && (
        <Button
          variant="error"
          type="button"
          className="flex-1"
          {...props.buttonDelete}
          leftSection={<FaTrash className={iconClassname} />}
        >
          Delete
        </Button>
      )}
      {formState.disabled === true && props.isEdit && (
        <Button
          {...props.buttonEdit}
          variant="primary"
          className="flex-1"
          onClick={(e) => {
            props.buttonEdit?.onClick?.(e);
            formState.setDisabled(false);
          }}
          leftSection={<FaPen className={iconClassname} />}
        >
          Edit
        </Button>
      )}
    </div>
  );
}
