/***
 * DID resolvers and DID resolution:
 * A DID resolver is a software and/or hardware component that takes a DID (and associated options) as input and produces a conforming DID document (and associated metadata) as output.
 * This process is called **DID resolution**. 
 */
/*

When resolving a relative DID URL reference, the algorithm specified in RFC3986 Section 5: Reference Resolution MUST be used. 
The base URI value is the DID that is associated with the DID subject, see Section § 5.2 DID Subject. 
The scheme is did. 
The authority is a combination of <method-name>:<method-specific-id>, and 
the path, query, and fragment values are those defined in Section § 3.2.3 Path, Section § 3.2.4 Query, and Section § 3.2.5 Fragment, respectively. 

*/

// Behaves as DNS resolver
// The process of obtaining the DID document associated with a DID is called DID resolution. 
// This process allows DID-enabled applications and services to discover the machine-readable metadata about the DID subject that is expressed by the DID document. This metadata can be used for further interaction with the DID subject
// For example:
// - To look up a public key in order to verify a digital signature from an Issuer of a Verifiable Credential.
// - To authenticate the DID controller when he/she needs to “log in” to a website or app.
// - To discover and access a well-known service associated with the DID controller, such as a website, social network, or licensing authority.
// - To request a DID-to-DID connection with the DID controller.


// It a two step process
// - DID resolution:  Figure out the dID doc
// - DID dereferencing:  Further process the did doc to access or retrive the reource identitieff in the did url


import IDID from './IDID';
import IDIDDoc from './IDIDDoc';

//Ref: https://www.w3.org/TR/did-core/#resolution/
export default interface IDIDResolver{
    // resolve ( did, did-resolution-input-metadata )
    // ->( did-resolution-metadata, did-document, did-document-metadata )

    // resolveStream ( did, did-resolution-input-metadata )
    // -> ( did-resolution-metadata, did-document-stream, did-document-metadata ) 

    resolve(did: IDID): IDIDDoc;


}