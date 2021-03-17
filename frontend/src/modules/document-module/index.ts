export function setChangeListener(
  ev: React.ChangeEvent<HTMLInputElement>,
  setState: (input: string) => void
) {
  setState(ev.target.value);
}

export function onEnter(ev: React.KeyboardEvent, callBack: () => void) {
  if (ev.key == "Enter") {
    callBack();
  }
}

export function getDateString(datetime: number): string {
  const date = new Date(datetime);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}
