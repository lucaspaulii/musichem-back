const capitalizeFirst = (string: string) =>
  `${string[0]}${string.slice(1).toLowerCase()}`;

export default capitalizeFirst;