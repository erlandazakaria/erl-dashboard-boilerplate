export const DEFAULT_KEY = {
  name: "",
  email: "",
  password: "",
  role: 4
};

export const ROLE_IN_WORD = {
  1: "Admin",
  2: "Owner",
  3: "Operator",
  4: "User",
  8: "Intro",
  9: "Not Verified"
};

export const ROLE_IN_ARRAY = [
  { val: 1, word: "Admin" },
  { val: 2, word: "Owner" },
  { val: 3, word: "Operator" },
  { val: 4, word: "User" },
  { val: 8, word: "Intro" },
  { val: 9, word: "Not Verified" }
];

export const USER_TABLE_COLUMN = ["name", "email", "role"];

export const USER_TABLE_SEARCH_KEY = ["name", "email"];
