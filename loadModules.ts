// For use in bundle or module

// TODO:

type Module = {
  triggerSelector: string;
  importTrigger?: boolean;
  path: string;
  lazyLoad?: boolean;
  chunkName?: string;
  moduleViewportOffset: number | boolean; // Pixels from the bottom of the viewport to start preloading the module
  successHandler?: () => void;
  errorHandler?: () => void;
};

interface LoadModulesProps {
    modules: Module[];
    gloablPreloadViewportOffset?: number | boolean;
}

export const loadModules = ({
    modules,
    gloablPreloadViewportOffset = 100,
}: LoadModulesProps): Promise<void> {
  const modulesToLoad = [];

  modules.forEach((module: Module) => {
    const {
      triggerSelector,
      importTrigger = false,
      path,
      lazyLoad = true,
      chunkName = '',
      moduleViewportOffset = 100,
      successHandler = () => {},
      errorHandler = () => {},
    } = module;

    if (document.querySelectorAll(module.triggerSelector).length) {
      modulesToLoad.push(module);
    }
  });

  //   try {
  //     const loadedModules = await Promise.all(modulesToLoad);
  //     // Use the loaded modules here
  //     loadedModules.forEach((module) => {
  //       module.doSomething();
  //     });
  //   } catch (error) {
  //     // Handle error if any of the modules fail to load
  //     console.error('Failed to load modules:', error);
  //   }
}

loadModules({
    modules: [
        {
            triggerSelector: '[data-accordion]',
            path: '@components',
            lazyLoad: true,
            chunkName: 'myModules/chunk-accordion',
            moduleViewportOffset: 100,
        },
    ],
    preloadViewportOffset: 100,

});
