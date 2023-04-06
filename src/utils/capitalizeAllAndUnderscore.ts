const capitalizeAllAndUnderscore = (string: string) =>
  `${string.toUpperCase().replaceAll(" ", "_")}`;

export default capitalizeAllAndUnderscore;
