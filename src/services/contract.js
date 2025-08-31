// src/services/contract.js
export const CONTRACT_CONFIG = {
    address: "0x71E2e8C1Ddc2Ea8C2a5672e9D3ACF9651E2A3B23",
    abi: [
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "postId",
                    type: "uint256",
                },
                {
                    internalType: "string",
                    name: "content",
                    type: "string",
                },
            ],
            name: "comment",
            outputs: [
                {
                    internalType: "uint256",
                    name: "commentId",
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
                    name: "postId",
                    type: "uint256",
                },
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "commentId",
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
            name: "CommentPosted",
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
            name: "downvote",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "string",
                    name: "title",
                    type: "string",
                },
                {
                    internalType: "string",
                    name: "content",
                    type: "string",
                },
                {
                    internalType: "uint8",
                    name: "category",
                    type: "uint8",
                },
                {
                    internalType: "string[]",
                    name: "topics",
                    type: "string[]",
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
                    name: "title",
                    type: "string",
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
                {
                    indexed: false,
                    internalType: "uint8",
                    name: "category",
                    type: "uint8",
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
            name: "CATEGORY_MAX",
            outputs: [
                {
                    internalType: "uint8",
                    name: "",
                    type: "uint8",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "CATEGORY_OPINION",
            outputs: [
                {
                    internalType: "uint8",
                    name: "",
                    type: "uint8",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "CATEGORY_QUEJA",
            outputs: [
                {
                    internalType: "uint8",
                    name: "",
                    type: "uint8",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "CATEGORY_SUGERENCIA",
            outputs: [
                {
                    internalType: "uint8",
                    name: "",
                    type: "uint8",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "CATEGORY_VIDA_UNIVERSITARIA",
            outputs: [
                {
                    internalType: "uint8",
                    name: "",
                    type: "uint8",
                },
            ],
            stateMutability: "view",
            type: "function",
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
                            name: "title",
                            type: "string",
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
                        {
                            internalType: "uint8",
                            name: "category",
                            type: "uint8",
                        },
                        {
                            internalType: "string[]",
                            name: "topics",
                            type: "string[]",
                        },
                    ],
                    internalType: "struct Rede.Post[]",
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
                    name: "postId",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "index",
                    type: "uint256",
                },
            ],
            name: "getComment",
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
                    name: "postId",
                    type: "uint256",
                },
            ],
            name: "getComments",
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
                    internalType: "struct Rede.Comment[]",
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
                    name: "title",
                    type: "string",
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
                {
                    internalType: "uint8",
                    name: "category",
                    type: "uint8",
                },
                {
                    internalType: "string[]",
                    name: "topics",
                    type: "string[]",
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
                            name: "title",
                            type: "string",
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
                        {
                            internalType: "uint8",
                            name: "category",
                            type: "uint8",
                        },
                        {
                            internalType: "string[]",
                            name: "topics",
                            type: "string[]",
                        },
                    ],
                    internalType: "struct Rede.Post[]",
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
                    name: "author_",
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
            inputs: [],
            name: "MAX_LENGTH_TITLE",
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
            inputs: [],
            name: "MAX_TOPICS",
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
                    name: "title",
                    type: "string",
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
                {
                    internalType: "uint8",
                    name: "category",
                    type: "uint8",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "postId",
                    type: "uint256",
                },
            ],
            name: "totalComments",
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
    ],
};

// Mapeo de categorías del contrato a nuestro sistema
export const CATEGORY_MAPPING = {
    0: "queja",
    1: "opinion",
    2: "sugerencia",
    3: "vida-universitaria",
};

export const REVERSE_CATEGORY_MAPPING = {
    queja: 0,
    opinion: 1,
    sugerencia: 2,
    "vida-universitaria": 3,
};

export const categories = [
    {value: "all", label: "Todas las categorías", color: "gray"},
    {value: "queja", label: "Queja", color: "red"},
    {value: "opinion", label: "Opinión", color: "blue"},
    {value: "sugerencia", label: "Sugerencia", color: "green"},
    {value: "vida-universitaria", label: "Vida Universitaria", color: "violet"},
];
