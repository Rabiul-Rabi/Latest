let status = false;
let userName=""
export function set(newValue) {
  status = newValue;
}
export function setUser(val){
    userName = val;
}
export function getUser(){
    return userName;
}
export function get() {
  return status;
}