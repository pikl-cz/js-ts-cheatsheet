
interface MyFunctionProps {
  propertyA?: boolean;
}

export function updateBannersHeight({ propertyA = true }: MyFunctionProps = {}): void {


  if (propertyA) {}

}
