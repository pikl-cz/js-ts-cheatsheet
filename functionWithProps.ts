
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
