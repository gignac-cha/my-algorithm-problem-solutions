export const readFile = async (file: File): Promise<string> =>
  new Promise<string>((resolve) => {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      if (typeof fileReader.result === 'string') {
        resolve(fileReader.result);
      }
    });
    fileReader.readAsText(file);
  });
