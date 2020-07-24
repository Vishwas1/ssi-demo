// https://w3c-ccg.github.io/did-method-registry
// https://w3c-ccg.github.io/did-method-web/
// when you have your own did, you need to register here with them to be recognised
// A definition of how a specific DID scheme must be implemented to work with a specific verifiable data registry. A DID method is defined by a DID method specification, which must specify the precise operations by which DIDs are created, resolved and deactivated and DID documents are written and updated
// Because there is no central authority for allocating or approving DID method names, there is no way to know for certain if a specific DID method name is unique. To help with this challenge, a non-authoritative list of known DID method names and their associated specifications is maintained in the DID Methods Registry, which is part of [DID-SPEC-REGISTRIES].
// Authors of new DID method specifications are encouraged to add their method names to the DID Method Registry so that other implementors and members of the community have a place to see an overview of existing DID methods.
// Each DID method is required to have its own technical specification, which must define the following aspects of the DID method:

//Ref: https://www.w3.org/TR/did-core/#methods
export default interface IDIDMethod{
    methodName: string; // 5 or less chars
    methodSpecificIdSyntax: string;
    op_create(); 
    op_read(DID: string);  
    op_verify(DID: string);
    op_update(DID: string); 
    op_deactivate(DID: string);
    //TODO security requirements: https://www.w3.org/TR/did-core/#security-considerations
    //TODO privacy requirements
}