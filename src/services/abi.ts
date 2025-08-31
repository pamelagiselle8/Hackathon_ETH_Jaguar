export const microPostsAbi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "downvote",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "content",
                type: "string",
            },
        ],
        name: "post",
        outputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "author",
                type: "address",
            },
            {
                indexed: false,
                internalType: "string",
                name: "content",
                type: "string",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "PostPosted",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "unvote",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "upvote",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "voter",
                type: "address",
            },
            {
                indexed: false,
                internalType: "int8",
                name: "previousVote",
                type: "int8",
            },
            {
                indexed: false,
                internalType: "int8",
                name: "newVote",
                type: "int8",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "up",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "down",
                type: "uint256",
            },
        ],
        name: "VoteCast",
        type: "event",
    },
    {
        inputs: [],
        name: "getAllPosts",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "author",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "content",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "timestamp",
                        type: "uint256",
                    },
                ],
                internalType: "struct MicroPosts.Post[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "getPost",
        outputs: [
            {
                internalType: "address",
                name: "author",
                type: "address",
            },
            {
                internalType: "string",
                name: "content",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "offset",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "limit",
                type: "uint256",
            },
        ],
        name: "getPosts",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "author",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "content",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "timestamp",
                        type: "uint256",
                    },
                ],
                internalType: "struct MicroPosts.Post[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "author",
                type: "address",
            },
        ],
        name: "getPostsByAuthor",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "getVotes",
        outputs: [
            {
                internalType: "uint256",
                name: "up",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "down",
                type: "uint256",
            },
            {
                internalType: "int256",
                name: "score",
                type: "int256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "MAX_LENGTH",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "myVote",
        outputs: [
            {
                internalType: "int8",
                name: "",
                type: "int8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "posts",
        outputs: [
            {
                internalType: "address",
                name: "author",
                type: "address",
            },
            {
                internalType: "string",
                name: "content",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalPosts",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
