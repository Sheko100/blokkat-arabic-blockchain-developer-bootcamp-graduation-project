## Project Description

**This is a decenteralized application for blind voting, which means that the voters won't know who voted for which option and how many votes for each option untill the poll ends**

### Directory Structure

include a directory tree strucutre here

## Design Decisions

1. **Inherited OpenZepplin Ownable contract**

Files:

- **src/contracts/VotingSystem.sol** (lines: 8 and 52)

2.


## Security Practices

1. **Used 0.8.20 as a specific compiler pragma**

Files:

- **src/contracts/VotingSystem.sol** (line: 2 )
- **src/test/VotingSystem.t.sol** (line; 2)


2. **Proper use of Require**

Files:

- **src/contracts/VotingSystem.sol** (line: 20)

3. **Used modifires for validation**

- **src/contracts/VotingSystem.sol** (lines: 85 and 106)

## Testing

To run the tests run:

```forge test```

## Deploying Smart Contract

Before you deploy, you will have to prepare your ```.env``` file:

1. Rename ```.env.example``` in the root of the project to  ```.env```

2. Add your private key as a value for ```PRIVATE_KEY```

3. Add your web3 address as a value for ```WEB3_ADDRESS```

4. The ```RPC_URL``` is already written as for Scroll Seploia, but you can change it if you would like

### Connect the deployed contract with Next.js app;

Copy the ABI and the contract address to the ```wagmiContractConfig``` object in the ```/dapp/app/common/contracts.ts``` file 

To check the ABI and test the deploying, run:

```make test_deploy```

To deploy on Scroll Sepolia and get the contract address, run:

```make deploy```

