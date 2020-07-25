/**
 * One or more services associated with the DID subject that can be used for concrete interaction via protocols supported by those services. This can include a wide range of protocols from instant messaging and social networking, to dedicated identity protocols such as OpenID Connect (OIDC), DIDComm as described in chapter 5 about SSI architecture, and others.
 */
 /*
 Example:
{
  ...
  "service": [{
    "id": "did:example:123456789abcdefghi#openid",
    "type": "OpenIdConnectVersion1.0Service",
    "serviceEndpoint": "https://openid.example.com/"
  }]
}
 */
// REf: https://www.w3.org/TR/did-core/#service-endpoints

export enum VerifiableCredentialServiceTypes{
    "VerifiableCredentialService"
  }

  
export interface IService{
    id: string;
    type: string;
    servicEndpoint: string;
}

