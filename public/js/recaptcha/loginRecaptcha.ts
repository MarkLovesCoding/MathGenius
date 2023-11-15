function onSubmit() :void{
  (document.getElementById("login-form") as HTMLFormElement).submit();
}
function onSubmitGoogle():void {
  (document.getElementById("google-login-form") as HTMLFormElement).submit();
}
function onSubmitGuestLogIn():void {
  (document.getElementById("guest-login-form") as HTMLFormElement).submit();
}