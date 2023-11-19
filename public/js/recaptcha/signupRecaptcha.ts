function onSubmitSignup():void {
  (<HTMLFormElement>document.getElementById("signup-form")).submit();
}

function onSubmitGuestSignUp():void {
  (<HTMLFormElement>document.getElementById("guest-login-form")).submit();
}