// CryptoDevsNFTAddress
export const BitsNFTAddress =
  "0x5B0ea6108783Fd2A400Ca8ce29ad15469408CfDF";
export const FakeNFTMarketplaceAddress =
  "0xd07323fb9a254272E954eAf190854e33Dda39C88";
// CryptoDevsDAOAddress  
export const WebDAOAddress =
  "0x6808d837fb6ccA80f5940a3111294d6e5d0eA8F4";

export const CryptoDevsNFTABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // REPLACE THIS WITH THE NFT CONTRACT ABI
export const FakeNFTMarketplaceABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "available",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "purchase",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]; // REPLACE THIS WITH THE FAKE MARKETPLACE ABI
export const CryptoDevsDAOABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftMarketplace",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_bitsNFT",
				"type": "address"
			}
		],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_nftTokenId",
				"type": "uint256"
			}
		],
		"name": "createProposal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalIndex",
				"type": "uint256"
			}
		],
		"name": "executeProposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "numProposals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "nftTokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "yayVotes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "nayVotes",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "executed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalIndex",
				"type": "uint256"
			},
			{
				"internalType": "enum WebDAO.Vote",
				"name": "vote",
				"type": "uint8"
			}
		],
		"name": "voteOnProposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawEther",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]; // REPLACE THIS WITH THE DAO ABI