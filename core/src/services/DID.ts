/*
A DID is a simple text string consisting of three parts, the: 

- URL scheme identifier (did)
- Identifier for the DID method
- DID method-specific identifier.

--------SYNTAX----------------------
did:<method-name>:metod-specific-id>
------------------------------------

E.g: did:example:123456789abcdefghi
*/

import DIDMethod from './DIDMethod';
import { v4 as uuid4 } from 'uuid';

export default class DID{
    method: DIDMethod;
    prefix: string;
    constructor(didM: DIDMethod){
        this.method = didM;
        this.prefix = "did";
    }

    private getUniqueIdentifier(){
        //TODO: This needs to be replaced with better cryptographic function. It MUST be unique
        return uuid4();
    }

    did(): string{
        return `${this.prefix}:${this.method.methodName}:${this.getUniqueIdentifier()}`;
    }

    // prefix
    // did [Syntax]
        // did
        // method-name
        // metod-specific-id
        // eg. did:foo:21tDAKCERh95uGgKbJNHYp
    // did_url :  A DID URL always identifies a resource to be located. It can be used, for example, to identify a specific part of a DID document.
        //  did-params
        // eg. did:foo:21tDAKCERh95uGgKbJNHYp?version-time=2002-10-10T17:00:00Z
        // Method-Specific Url : did:<method-name>:21tDAKCERh95uGgKbJNHYp?<method-name>:bar=high
    // hl
    // servie 
    // version-id
    // version-time
    // did_path: 
        // A DID path SHOULD be used to address resources available through a service endpoint. 
        // e.g did:example:123456/path
}