import { AbstractControl, ValidatorFn } from '@angular/forms';

export class KKCommon {
    public static API_LOGIN = '/api/account/login';
    public static API_REGISTER = '/api/account/register';
    public static API_GETPRODUCTS = '/api/product/getproducts';
    public static API_ADDPRODUCT = '/api/product/addproduct';
    public static API_DELETEPRODUCT = '/api/product/deleteproduct';
    public static API_UPDATEPRODUCT = '/api/product/updateproduct';

    public static MustMatch(passwordControl: AbstractControl): ValidatorFn {
        return (cpasswordControl: AbstractControl): { [key: string]: boolean } | null => {
          // return null if controls haven't initialised yet
          if (!passwordControl && !cpasswordControl) {
            return null;
          }
    
          // return null if another validator has already found an error on the matchingControl
          if (cpasswordControl.hasError && !passwordControl.hasError) {
            return null;
          }
          // set error on matchingControl if validation fails
          if (passwordControl.value !== cpasswordControl.value) {
            return { mustMatch: true };
          } else {
            return null;
          }
    
        };
    
    
      }
}
