function onSubmit() :void{
  (<HTMLFormElement>document.getElementById("login-form")).submit();
}
function onSubmitGoogle():void {
  (<HTMLFormElement>document.getElementById("google-login-form")).submit();
}
function onSubmitGuestLogIn():void {
  (<HTMLFormElement>document.getElementById("guest-login-form") ).submit();
}