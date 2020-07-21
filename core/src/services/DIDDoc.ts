

/**
 * 1. Identitfiers
2. DID subject
3. Verificataion method : can be used to authenticate or authorize interactions with the DID subject or associated parties.

 */





// @context
// id
// authentication
  // id
  // type
  // controller
  // publickeybase58
// service

class Authentication{
  id: string;
  type: string;
  controller: string;
  publicKeyBase58: string;
  constructor(type, controller, publicKeybase58) {
    this.id = "";
    this.type = type;
    this.controller = controller;
    this.publicKeyBase58 = publicKeybase58;
  }
}

/**
 * One or more services associated with the DID subject that can be used for concrete interaction via protocols supported by those services. This can include a wide range of protocols from instant messaging and social networking, to dedicated identity protocols such as OpenID Connect (OIDC), DIDComm as described in chapter 5 about SSI architecture, and others.
 */
class Service{
  id: string;
  type: string;
  servicEndpoint: string;
  constructor(type, endpoint) {
    this.id = "";
    this.type = type;
    this.servicEndpoint = endpoint;
  }
}

export default class DIDDoc{
  id: string;
  context: string;
  authentication: Array<Authentication>;
  service: Array<Service>;
  timestamp: number;
  

  constructor(){
    this.id = "";
    this.context = ""
    this.authentication = []; //new Authentication("","","");
    this.service = []; //new Service("","");
    this.timestamp = 0; //epoch
  }

  toString(DIDDocInstance: DIDDoc) {
    // should be in the form of JSON-LD encoding
    // https://json-ld.org/
    return JSON.stringify(DIDDocInstance);
  }
}