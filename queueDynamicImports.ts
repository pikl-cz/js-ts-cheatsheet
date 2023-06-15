// Inspirace https://github.com/tc39/proposal-defer-import-eval


interface IImport {
  name: string;
  triggers: HTMLElement | NodeListOf<HTMLElement> | [] | null;
  chunkName: string;
  filePath: string;
  triggerAsProperty?: boolean;
}

const { querySelectorAll: qa, querySelector: q } = document;

const importStack: IImport[] = [
  {
    // Můj modul
    name: 'myModuleInit',
    triggers: [q<HTMLButtonElement>('[data-my-module]')],
    chunkName: 'default/chunk-my-module',
    filePath: '../myModule',
  },
];

importStack.forEach(async (importItem): void => {
  if (importItem.elements && importItem.triggers.length) {
    const { [importItem.name]: importFunction } = await import(
      /* webpackChunkName: importItem.chunkName */
      importItem.filePath
    );

    importFunction();
  }
});


/*
Promise.all(importStack).then(
  () => {},
  () => {}
);
*/
