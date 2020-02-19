import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const passwordConfirmation: ValidatorFn = (
  controls: FormGroup
): ValidationErrors | null => {
  const password1 = controls.get('password1').value;
  const password2 = controls.get('password2').value;

  return password2 !== password1 ? { notconfirm: true } : null;
};
