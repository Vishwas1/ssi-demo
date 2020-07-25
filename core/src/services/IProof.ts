
/*
Use your DIDs to test Linked Data Signatures, such OpenPgpSignature2019 which is currently being developed. When DID Documents are signed, they include a proof attribute, which is used to provide proof that someone controlled the private key associated with the public key listed in the did document at the created datetime.
Ref: https://github.com/decentralized-identity/github-did#what-can-i-do-with-my-did
"proof": {
    "type": "OpenPgpSignature2019",
    "creator": "did:github:OR13#kid=ibHP1ksrJp5FQjP7hhmTXV7YE5o5bB6YFoODu9n_82E",
    "domain": "GitHubDID",
    "nonce": "9c28424e440806718a5165670f79bbc2",
    "created": "2019-05-12T16:53:25.038Z",
    "signatureValue": "-----BEGIN PGP SIGNATURE-----\r\nVersion: OpenPGP.js v4.4.7\r\nComment: https://openpgpjs.org\r\n\r\nwl0EARMIAAYFAlzYT4UACgkQHi/X/OuNO7WZQAD47BbeS2pgFW/WwPbHvC8I\r\nMfsOFhSJEywkED7uz0E4RwD/RRrsmPPb4S4Z+7D2skjiFtnd2nWd+BXcxvhm\r\nGzKk1FU=\r\n=W/tu\r\n-----END PGP SIGNATURE-----\r\n"
  }
  */
export default interface Proof{
    type: string; 
    creator: string; 
    domain: string; 
    nonce: string; 
    created: string; 
    signatureValue: string; 
}