/**
 * One or more services associated with the DID subject that can be used for concrete interaction via protocols supported by those services. This can include a wide range of protocols from instant messaging and social networking, to dedicated identity protocols such as OpenID Connect (OIDC), DIDComm as described in chapter 5 about SSI architecture, and others.
 */
 /*
 Example:
{
  ...
  "service": [{
    "id": "did:example:123#edv",
    "type": "EncryptedDataVault",
    "serviceEndpoint": "https://edv.example.com/"
  }]
}
 */
// REf: https://www.w3.org/TR/did-core/#service-endpoints

enum VerifiableCredentialServiceTypes{
    "VerifiableCredentialService"
  }

  
export default interface IService{
    id: string;
    type: VerifiableCredentialServiceTypes;
    servicEndpoint: string;
}

