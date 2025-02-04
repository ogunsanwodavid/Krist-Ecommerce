export interface Address {
  id: string;
  name: string;
  mobileNumber: string;
  houseNumber: string;
  lga: string;
  state: string;
  zipCode: string;
  default: boolean;
}

export interface AddressesState {
  addresses: Address[];
}
