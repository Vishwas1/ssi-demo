import { IService, VerifiableCredentialServiceTypes }  from './IService';

export default class Service implements IService{
  id: string;
  type: string;
  servicEndpoint: string;
  constructor(id: string, serviceEp: string){
    this.id = id;
    this.type = VerifiableCredentialServiceTypes[0]
    this.servicEndpoint = serviceEp
  }
}