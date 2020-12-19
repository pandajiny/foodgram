interface SearchPlaceParams {
  // key : string It's required but only keeping inside of source
  input: string;
  inputtype: "textquery" | "phonenumber";
}
