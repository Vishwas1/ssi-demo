// https://w3c-ccg.github.io/did-method-registry
// when you have your own did, you need to register here with them to be recognised

/**
 * A definition of how a specific DID scheme must be implemented to work with a specific verifiable data registry. A DID method is defined by a DID method specification, which must specify the precise operations by which DIDs are created, resolved and deactivated and DID documents are written and updated
 * 
 */

// Each DID method is required to have its own technical specification, which must define the following aspects of the DID method:
import DID from './DID';
export default class DIDMethod {
     methodName: string; // hypersign
     methodSpecificIdentiferSyntax: string;
     constructor(name: string, idSyntax: string){
         this.methodName = name;
         this.methodSpecificIdentiferSyntax = idSyntax;
     }

     createDid(){
         //TODO:
         // Create DID
         // Create DIDDoc
         // Associate DID with DIDDoc
         // Store the DID and DIDDoc into Registry
     }

     updateDid(DID :DID){
         //TODO:
         // Fetch the DIDDoc of this DID
         // Change the conent of DIDDoc
         // Store the content into REgistry
     }

     revokeDid(DID :DID){
         //TODO:
         // Same as update
     }
 }