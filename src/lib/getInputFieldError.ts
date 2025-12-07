// export interface IInputErrorState {
//   success: boolean;
//   errors: {
//     field: string;
//     message: string;
//   }[];
// }
// export const getInputFieldError = (
//   fieldName: string,
//   state: IInputErrorState
// ) => {
//   if (state && state.errors) {
//     const error = state.errors.find((err) => err.field === fieldName);
//     return error ? error.message : null;
//   } else {
//     return null;
//   }
// };

export interface IInputErrorState {
  success: boolean;
  errors?: {
    field: string;
    message: string;
  }[];
}

export const getInputFieldError = (fieldName: string,
  // 🎯 FIX: Allow 'state' to be null in the utility function signature
  state: IInputErrorState | null
) => {
  // The check should now look for 'state' being non-null first.
  // (Your original implementation already did this, but the type needs to match)
  if (state && state.errors) {
    const error = state.errors.find((err) => err.field === fieldName);
    return error ? error.message : null;
  } else {
    return null;
  }
};
