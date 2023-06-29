/*
 Ověřit, zda je trigger v DOMu a spustí init funkci modulu

  @example
  await prepareModule({
    trigger: document.querySelectorAll('[data-accordion]'),
    init: async (trigger) => {
      const { Accordion } = await import(
        /* webpackChunkName: 'default/chunk-accordion' * /
        '../../components/accordion'
      );

      Accordion(trigger as NodeListOf<HTMLDivElement>);
    },
  });
*/

type Trigger = HTMLElement | NodeListOf<HTMLElement> | null;

interface PrepareModuleProps {
  title?: string;
  // spustí načtení modulu
  trigger?: Trigger;
  // funkce, která se spustí při načtení modulu
  init?: (trigger?: HTMLElement | NodeListOf<HTMLElement>) => void;
  // načítat modul až při scrollu
  lazyLoad?: boolean;
  // offset před načtením modulu
  preLoadOffset?: number;
}

export const prepareModule = ({
  title,
  trigger,
  init,
}: // lazyLoad = true,
// preLoadOffset = 100,
PrepareModuleProps) => {
  const initTrigger = trigger instanceof NodeList ? trigger[0] : trigger;

  if ((!initTrigger || typeof initTrigger === 'undefined') && typeof init !== 'function') {
    if (!init || typeof init === 'undefined') throw new Error('Module  has no init function');
    return;
  }

  const hasManyTriggers = trigger instanceof NodeList && trigger.length > 1;

  const hasTrigger = trigger instanceof HTMLElement || hasManyTriggers;

  // Spustit bez triggeru - načte se vždy
  if (!hasTrigger && typeof init === 'function') {
    init();

    return;
  }

  if (!init) return;

  // eslint-disable-next-line no-console
  console.log('testhonza');

  // eslint-disable-next-line no-console
  console.log(initTrigger);

  // Spustit s triggerem - načte se jen když je trigger v DOMu
  if (initTrigger && typeof trigger !== 'undefined' && trigger) {
    // eslint-disable-next-line no-console
    console.log('testhonza2');

    // eslint-disable-next-line no-console
    console.log(initTrigger);
    init(trigger);

    // if (lazyLoad) {
    //   await init(trigger);
    // } else await init(trigger);
  }
};
