
interface MyFunctionProps {
  propertyA?: boolean;
}

export function myFunction({ propertyA = true }: MyFunctionProps = {}): void {


  if (propertyA) {}

}
