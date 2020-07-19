## SSI-Demo

Sample implementation of SSI protocol with [W3C specification](https://www.w3.org/TR/did-core/)

## Components

1. **SSI-Infra**: Middleware to create did (i.e onboarding) and manages registry
2. **Issuers**: One who issue verifiable credentials.
3. **Verifier**: One who verifies verifiable credentials.

## Overall Architecture

![img](docs/architecture.png)

## Onboarding Flow

[Onboarding](ssi-infa/README.md)

## Issuance Flow

[Issuance](issuer/README.md)

## Verification Flow

[Verification](issuer/README.md)

## Reference

- https://www.w3.org/TR/vc-data-model/ 
- https://www.w3.org/TR/vc-imp-guide/ 