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



async function loadModules(): Promise<void> {
  const modulesToLoad = [];

  if (document.querySelector('.init-element-1')) {
    modulesToLoad.push(import(/* webpackChunkName: "module1" */ './module1'));
  }

  if (document.querySelector('.init-element-2')) {
    modulesToLoad.push(import(/* webpackChunkName: "module2" */ './module2'));
  }

  if (document.querySelector('.init-element-3')) {
    modulesToLoad.push(import(/* webpackChunkName: "module3" */ './module3'));
  }

  try {
    const loadedModules = await Promise.all(modulesToLoad);
    // Use the loaded modules here
    loadedModules.forEach((module) => {
      module.doSomething();
    });
  } catch (error) {
    // Handle error if any of the modules fail to load
    console.error('Failed to load modules:', error);
  }
}

loadModules();

/*
import("/path/to/import-module.js") // .js can be skipped
  .then((module) => {
    // do something with the module
  });
  */
