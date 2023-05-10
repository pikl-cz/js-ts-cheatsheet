interface IImport {
  name: string;
  elements: [];
  chunkName: string;
  filePath: string;
}

const { querySelectorAll: qa, querySelector: q } = document;

const importStack: IImport[] = [
  {
    name: 'myModuleInit',
    elements: [q<HTMLButtonElement>('[data-my-module]')],
    chunkName: 'default/chunk-my-module',
    filePath: '../myModule',
  },
];

importStack.forEach(async (importItem): void => {
  if (importItem.elements && importItem.elements.length) {
    const { [importItem.name]: importFunction } = await import(
      /* webpackChunkName: importItem.chunkName */
      importItem.filePath
    );

    importFunction();
  }
});
