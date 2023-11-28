export const doNothing = () => {};

export const convertByteUnit = (size: number) => {
  if (size < 1024) {
    if (size === 1) {
      return `${size} byte`;
    }
    return `${size} bytes`;
  }
  size /= 1024;
  if (size < 1024) {
    return `${size} KB`;
  }
  size /= 1024;
  if (size < 1024) {
    return `${size} MB`;
  }
  size /= 1024;
  if (size < 1024) {
    return `${size} GB`;
  }
  return 'Extra large size';
};
