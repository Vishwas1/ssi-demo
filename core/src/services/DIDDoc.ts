import IDIDDoc from './IDIDDoc';
import IDID from './DID';
import VerificationRelationShips  from './VerificationRelationShips';
import Service from './Service';
import Proof  from './Proof';
import PublicKeyVerificationMethod from './VerificationMethods';

export default class DIDDoc implements IDIDDoc{
  context: string;
  id: IDID;
  controller: IDID; 

  verficationRelationShip: VerificationRelationShips;
  publicKey: Array<PublicKeyVerificationMethod>;
  
  services: Array<Service>;
  proof: Proof;

  timestamp: number;
  created: string;
  updated: string;
  constructor(id: IDID, controller: IDID, authentication: VerificationRelationShips ){
    this.context = ""
    this.controller = controller;
    this.id = id;
    this.verficationRelationShip = authentication;
    this.publicKey = [];
    this.services = [];
    this.proof = "";
    this.timestamp = 0;
    this.created = "";
    this.updated = "";
  }

  toString(DIDDocInstance: IDIDDoc) {
    // should be in the form of JSON-LD encoding
    // https://json-ld.org/
    return JSON.stringify(DIDDocInstance);
  }
}