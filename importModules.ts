/* eslint-disable no-unused-vars */

type Trigger = {
  selector: string
  many?: boolean
  importSelf?: boolean
}

type Module = {
  trigger: Trigger
  path?: string
  title?: string
  chunkName?: string
  //   lazyLoad?: boolean;
  //   moduleViewportOffset: number | boolean; // Pixels from the bottom of the viewport to start preloading the module
  init?: (trigger?: HTMLElement | NodeListOf<HTMLElement>) => Promise<void>
  successHandler?: () => void
  errorHandler?: () => void
  triggerFounded?: HTMLElement | NodeListOf<HTMLElement> | null
}

type OptionsProps = {
  //   lazyLoad?: boolean;
  //   preloadViewportOffset?: number | boolean;
  pathFallback?: string
}

interface InitModuleProps {
  myModule: Module
  options?: OptionsProps
}

const initModule = async ({
  myModule,
}: // options
InitModuleProps) => {
  const defaultOptions = {
    // globalLazyLoad = true,
    // globalPreloadViewportOffset = 100,
    globalPathFallback: '@components',
  }

  const {
    title,
    trigger = {
      selector: '',
      many: false,
      importSelf: false,
    },
    path = defaultOptions.globalPathFallback,

    // chunkName,
    //   lazyLoad = globalLazyLoad,
    //   moduleViewportOffset = globalPreloadViewportOffset,

    init,
    // successHandler = () => {},
    // errorHandler = () => {},
    triggerFounded,
  } = myModule

  // Custom inicializace modulu
  if (init) {
    if (trigger.importSelf && triggerFounded) {
      await init(triggerFounded)
    } else {
      await init()
    }
    return
  }

  if (!path) return
  const module = await import(path)
    .then((reponse) => {
      // console.log(reponse);
      // console.log(chunkName);
      // console.log('module loaded');
      // module.default();
    })
    .catch((error) => {
      // console.log(error);
    })

  // console.log(module);
  // module.default();
}

interface LoadModulesProps {
  modules: { [key: string]: Module }
  options?: OptionsProps
}

export const loadModules = async ({ modules, options }: LoadModulesProps) => {
  const modulesToLoad: Module[] = []

  Object.keys(modules).forEach((key, index) => {
    const myModule = modules[key]

    // Přidat title
    myModule.title = key

    // Přidat chunkName
    myModule.chunkName = `default/chunk-${index}-${key}`

    // Najít trigger/y a přidat modul do fronty načítání
    if (myModule.trigger.many) {
      const foundedElements: NodeListOf<HTMLElement> | null =
        document.querySelectorAll(myModule.trigger.selector)

      if (
        foundedElements.length &&
        foundedElements.length > 0 && // NodeList is not empty
        typeof foundedElements !== 'undefined' &&
        foundedElements instanceof NodeList &&
        Array.from(foundedElements).every((el) => el instanceof HTMLElement)
      ) {
        modulesToLoad.push({ ...myModule, triggerFounded: foundedElements })
      }
    } else {
      const foundedElement: HTMLElement | null = document.querySelector(
        myModule.trigger.selector
      )

      if (foundedElement && foundedElement instanceof HTMLElement) {
        modulesToLoad.push({ ...myModule, triggerFounded: foundedElement })
      }
    }
  })

  // Načíst konkrétní moduly
  const promises = modulesToLoad.map((item) =>
    initModule({ myModule: item, options })
  )

  await Promise.all(promises).then(
    () => {},
    () => {}
  )
}


// Usage:


// import { loadModules, initModule } from './loadModules';


// export const modulesUI = {
  // Seznam se skrývajícími se tématy
  // accordion: {
   //  trigger: { selector: '[data-accordion]', importSelf: true, many: true },
  // },
  // Univerzálního modálního okna
  // modal: {
  //   trigger: { selector: '[data-modal]', importSelf: true, many: true },
  // },
  
// };


// loadModules({
//   modules: { ...modulesBase, ...modulesArticle, ...modulesFeatures, ...modulesUI },
// });



