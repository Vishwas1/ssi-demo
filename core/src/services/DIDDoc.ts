import IDIDDoc from './IDIDDoc';
import Secp256k1SignatureAuthentication2018  from './VerificationRelationShips';
import Service from './Service';
import Proof  from './Proof';
import { JwsVerificatioMethod, Ed25519VerificationMethod, Secp256k1VerificationMethod } from './VerificationMethods';

export default class DIDDoc implements IDIDDoc{
  context:string
  id: string;
  controller: string; 

  authentication: Array<Secp256k1SignatureAuthentication2018> = [];
  publicKey: Array<JwsVerificatioMethod | Ed25519VerificationMethod | Secp256k1VerificationMethod> = [];
  
  services: Array<Service>;
  proof: Proof;

  created: number;
  updated: number;
  constructor(id: string, controller: string){
    this.context = 'https://w3id.org/did/v1'
    this.controller = controller;
    this.id = id;
    const relation = new Secp256k1SignatureAuthentication2018(`${id}#keys1`)
    this.authentication.push({...relation});
    const method = new Secp256k1VerificationMethod(`${id}#keys1`)
    this.publicKey.push({...method})
    const service =  new Service(`${id}#vcs`, "https://example.com/vc/")
    this.services = [{...service}];
    this.proof = "";
    this.created = Date.now();
    this.updated = Date.now();
  }
}