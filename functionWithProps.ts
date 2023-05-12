
interface MyFunctionProps {
  propertyA?: boolean;
}

// Arrow func
export function myFunction = ({ propertyA = true }: MyFunctionProps = {}): void {

  if (propertyA) {}

}

// Function
export function myFunction({ propertyA = true }: MyFunctionProps = {}): void {

  if (propertyA) {}

}



// Spread arg. on props + default values
interface Test {
  rootMargin?: string;
  threshold?: number;
  lazyloadedImages: NodeListOf<HTMLImageElement>;
  CLASS_SELECTOR: string;
}

// export const test = (...args: Test[]) => {
export const test = (args: Test) => {
  const { lazyloadedImages, rootMargin = '500px', threshold, CLASS_SELECTOR = '.lazyload' } = args;
  console.log({ lazyloadedImages, rootMargin, threshold, CLASS_SELECTOR });
};
