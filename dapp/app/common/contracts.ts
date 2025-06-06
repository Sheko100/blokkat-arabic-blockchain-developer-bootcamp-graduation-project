export const wagmiContractConfig = {
  address: '0x66e54F78FbD565b1D0fC2f1FcCF832c8F4529B55',
  abi: [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "initialOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "activePollsCount",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "allPollsCount",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "createNewPoll",
    "inputs": [
      {
        "name": "title",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "options",
        "type": "string[]",
        "internalType": "string[]"
      },
      {
        "name": "duration",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "deletePoll",
    "inputs": [
      {
        "name": "pollId",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "getActivePolls",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct Poll[]",
        "components": [
          {
            "name": "owner",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "votesCount",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "id",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "endTime",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "title",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "options",
            "type": "string[]",
            "internalType": "string[]"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAllPolls",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct Poll[]",
        "components": [
          {
            "name": "owner",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "votesCount",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "id",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "endTime",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "title",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "options",
            "type": "string[]",
            "internalType": "string[]"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getOptionVotes",
    "inputs": [
      {
        "name": "pollId",
        "type": "uint32",
        "internalType": "uint32"
      },
      {
        "name": "optionId",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUserVotes",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint32[2][]",
        "internalType": "uint32[2][]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isPollExist",
    "inputs": [
      {
        "name": "pollId",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "polls",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "votesCount",
        "type": "uint32",
        "internalType": "uint32"
      },
      {
        "name": "id",
        "type": "uint32",
        "internalType": "uint32"
      },
      {
        "name": "endTime",
        "type": "uint32",
        "internalType": "uint32"
      },
      {
        "name": "title",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "pollsIndexMap",
    "inputs": [
      {
        "name": "",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "vote",
    "inputs": [
      {
        "name": "pollId",
        "type": "uint32",
        "internalType": "uint32"
      },
      {
        "name": "optionId",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "PollCreated",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "pollId",
        "type": "uint32",
        "indexed": false,
        "internalType": "uint32"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "PollDeleted",
    "inputs": [
      {
        "name": "pollId",
        "type": "uint32",
        "indexed": false,
        "internalType": "uint32"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "VoteRegistered",
    "inputs": [
      {
        "name": "voter",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "pollId",
        "type": "uint32",
        "indexed": false,
        "internalType": "uint32"
      },
      {
        "name": "optionId",
        "type": "uint32",
        "indexed": false,
        "internalType": "uint32"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "OwnableInvalidOwner",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "OwnableUnauthorizedAccount",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ]
  }
]

} as const