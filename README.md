## Index

1. Onboarding 
2. Issuance
3. Verification

## Components

1. **SSI-Middleware**: Middleware to create did (i.e onboarding) and manages registry
2. **Issuers**: One who issue verifiable credentials.
3. **Verifier**: One who verifies verifiable credentials.

## Overall Architecture

![img](docs/architecture.png)

## Onboarding Flow

![img](docs/DID-registrationflow.png)


Notes: 

- Here `Entity` could be any of the following: `A user`, `A issuer`, `A verfier`. They all has to be onboarded.
- [Here](https://sequencediagram.org/index.html#initialData=PTAOEMCcBcEsGNYQHbQAQEkDOWCuBTSAKBAhgSXFTQDVDYAzWQksKORFdAVS0IFoA6uAA2I-NCJE40cWgAiGeWgBK+AOaws0SODgB7ZGgYj9AdylkOlagFFUsaAE8iVilzQBlTxn4BZWAATQPEzKHwiexknfgA+b18A4NDwgC40YHhIfD18JVV8AEcCbTQAHSMABShwAFssdIBvNFBcACMRBABrfCc0AF8iZH1ofDR9ADdCLx9-IJD8MOz0gHF8ZEJcrAV8qkDy5G19bO3DNGzNbUgXBLnkxfC0fjiZ3zVLnSdUoZGxyenbu8tJ90p5oMd8NtoAALMaKZR7HbKeT6eBEQEaYHXJ5xW5JBZLfDpeHo2b4lLZHGxKKOL5IqQMxlAA) is the url to edit this image

## Issuance Flow

[issuer](issuer/README.md)

## Verification Flow

[verifier](issuer/README.md)

## Reference

- https://www.w3.org/TR/vc-data-model/ 
- https://www.w3.org/TR/vc-imp-guide/ 