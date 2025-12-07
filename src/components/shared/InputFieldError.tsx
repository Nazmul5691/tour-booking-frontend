import { getInputFieldError, IInputErrorState } from "@/lib/getInputFieldError";
import { FieldDescription } from "../ui/field";

// interface InputFieldErrorProps {
//   field: string;
//   state: IInputErrorState;
// }

interface InputFieldErrorProps {
  field: string;// 🎯 FIX: Allow 'state' to be null (the initial value from useActionState)
  state: IInputErrorState | null;
}

const InputFieldError = ({ field, state }: InputFieldErrorProps) => {
  if (getInputFieldError(field, state as IInputErrorState)) {
    return (
      <FieldDescription className="text-red-600">
        {getInputFieldError(field, state as IInputErrorState)}
      </FieldDescription>
    );
  }

  return null;
};

export default InputFieldError;
