export function setChangeListener(
  ev: React.ChangeEvent<HTMLInputElement>,
  setState: (input: string) => void
) {
  setState(ev.target.value);
}

export function setEnterKeyPressListener(
  ev: React.KeyboardEvent,
  callBack: () => void
) {
  if (ev.key == "Enter") {
    callBack();
  }
}

export function getCookie(key: string): string | null {
  const cookie = document.cookie.split("; ");
  const value = cookie.find((row) => row.startsWith(key))?.split("=")[1];
  return value || null;
}
