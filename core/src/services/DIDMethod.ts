import DID from './DID';
export default class DIDMethod {
     methodName: string; // hypersign
     methodSpecificIdentiferSyntax: string;
     constructor(name: string, idSyntax: string){
         this.methodName = name;
         this.methodSpecificIdentiferSyntax = idSyntax;
     }

     /////// Method Operations: https://w3c.github.io/did-core/#method-operations

     // https://w3c.github.io/did-core/#create
     createDid(){
         //TODO:
         // Create DID
         // Create DIDDoc
         // Associate DID with DIDDoc
         // Store the DID and DIDDoc into Registry
     }

     
     // Ref: https://w3c.github.io/did-core/#update
     updateDid(DID :DID){
         //TODO:
         // Fetch the DIDDoc of this DID
         // Change the conent of DIDDoc
         // Store the content into REgistry
     }

     // Ref: https://w3c.github.io/did-core/#deactivate
     revokeDid(DID :DID){
         //TODO:
         // Same as update
     }
 }
