// https://sentry.io/welcome/
// https://medium.com/udacity-engineering/handling-errors-like-a-pro-in-typescript-d7a314ad4991


// https://stackoverflow.com/questions/23790509/proper-use-of-errors
// https://journal.plain.com/posts/2022-10-04-error-handling-in-typescript-like-a-pro/

try {
    throw new RangeError();
}
catch (e){
    if (e instanceof RangeError){
        console.log('out of range');
    } else { 
        throw; 
    }
}


  function throwErr(msg: string): never {
    throw new Error(msg);
  }

  try {
    const elementNew: HTMLButtonElement | null = document.querySelector('.dsadasdas');
    throw 'TEST';
    if (!elementNew) throwErr('Something went wrong');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('An error occurred:', error);
  }

// https://tslog.js.org/#/
