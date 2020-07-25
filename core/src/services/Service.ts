import { IService, VerifiableCredentialServiceTypes }  from './IService';

export default class Service implements IService{
  id: string;
  type: VerifiableCredentialServiceTypes;
  servicEndpoint: string;
  constructor(serviceUri: string, serviceEp: string){
    this.id = serviceUri;
    this.type = VerifiableCredentialServiceTypes.VerifiableCredentialService
    this.servicEndpoint = serviceEp
  }
}