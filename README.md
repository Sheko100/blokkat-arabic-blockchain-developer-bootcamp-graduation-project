## Project Description

**This is a decenteralized application for blind voting, which means that the voters won't know who voted for which option and how many votes for each option untill the poll ends**

### Directory Structure
```
├── dapp  # Next.js App
│   ├── app
│   │   ├── common
│   │   │   ├── contractOperations.ts
│   │   │   └── contracts.ts
│   │   ├── components
│   │   │   ├── AccountInfo.tsx
│   │   │   ├── Account.tsx
│   │   │   ├── ConfirmModal.tsx
│   │   │   ├── CreatePoll.tsx
│   │   │   ├── Option.tsx
│   │   │   ├── PollBar.tsx
│   │   │   ├── PollsList.tsx
│   │   │   ├── Poll.tsx
│   │   │   └── VotingSystem.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── config
│   │   └── index.tsx
│   ├── context
│   │   └── index.tsx
│   ├── next.config.ts
│   ├── next-env.d.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.mjs
│   ├── public
│   │   ├── file.svg
│   │   ├── globe.svg
│   │   ├── next.svg
│   │   ├── vercel.svg
│   │   └── window.svg
│   ├── README.md
│   └── tsconfig.json
├── foundry.toml
├── LICENSE
├── Makefile
├── README.md
├── script
├── src # Smart Contract
│   └── VotingSystem.sol
└── test
    └── VotingSystem.t.sol
```

## Design Decisions

1. **Inherited OpenZepplin Ownable contract**

Files:

- **src/contracts/VotingSystem.sol** (lines: 18 and 66)

2. **Access Control Restrictions**

Files:

- **src/contracts/VotingSystem.sol** (lines: 51, 154, and 214)

3. **Optimizing Gas**

Files:

- **src/contracts/VotingSystem.sol** (lines: 23, 32, and 35)


## Security Practices

1. **Used 0.8.20 as a specific compiler pragma**

Files:

- **src/contracts/VotingSystem.sol** (line: 2 )
- **src/test/VotingSystem.t.sol** (line; 2)


2. **Proper use of Require**

Files:

- **src/contracts/VotingSystem.sol** (line: 42, 47, 52, and 62)

3. **Used modifires for validation**

- **src/contracts/VotingSystem.sol** (lines: 40, 46, 51 and 61)

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

## Running Next.js App

### Prepare .env file

1. Rename ```.env.example``` in the ```/dapp``` directory to ```.env```

2. Create a new project on Reown Cloud at https://cloud.reown.com and obtain a new project ID

3. Add the project ID as a value for ```NEXT_PUBLIC_PROJECT_ID``` in ```.env``` file

### Run app in development

While in the ```/dapp``` directory run:

```npm run dev```

### Build app

While in the ```/dapp``` directory run:

```npm run build```

## Important Links

### Public URL

https://voting-dapp-ten-sandy.vercel.app/

### Demo Video

https://vimeo.com/1089503267?share=copy#t=0

### Contract Addresses and Transaction links

Old contract: 0x1419fE1CB72920084939bFE02a25D9Eaf6f5a4a2

Transaction link: https://sepolia.scrollscan.com/tx/0xfa47b89b534a2451503ee15d8abbbbd99cdfd328510ceea271d990e7adf8c597

Old contract: 0x565d9CC5c46a5Cd2ddE6524517c059336da79E42

Transaction link: https://sepolia.scrollscan.com/tx/0xcaebe2aa13aa113d0d179ade844a7e57d823d0433d4837c9eace98a75dd96594

**Latest contract**: 0x66e54F78FbD565b1D0fC2f1FcCF832c8F4529B55

Transaction Link: https://sepolia.scrollscan.com/tx/0x123c29a5f05879b14f33dc4e9b2e75102b3b5f89c21115550d3cbc243c5c1a9f

