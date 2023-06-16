// Sketch

import { loadModules } from './main';

describe('loadModules', () => {
  it('should load modules if corresponding initialization elements exist', async () => {
    // Mock the presence of initialization elements in the DOM
    document.body.innerHTML = `
      <div class="init-element-1"></div>
      <div class="init-element-2"></div>
    `;

    // Mock the module imports
    const module1 = { doSomething: jest.fn() };
    const module2 = { doSomething: jest.fn() };

    jest.mock('./module1', () => module1);
    jest.mock('./module2', () => module2);

    await loadModules();

    expect(module1.doSomething).toHaveBeenCalled();
    expect(module2.doSomething).toHaveBeenCalled();
  });

  it('should not load modules if corresponding initialization elements do not exist', async () => {
    // Mock the absence of initialization elements in the DOM
    document.body.innerHTML = '';

    // Mock the module imports
    const module1 = { doSomething: jest.fn() };
    const module2 = { doSomething: jest.fn() };

    jest.mock('./module1', () => module1);
    jest.mock('./module2', () => module2);

    await loadModules();

    expect(module1.doSomething).not.toHaveBeenCalled();
    expect(module2.doSomething).not.toHaveBeenCalled();
  });
});
