import { gql } from "@apollo/client";

const GAME_RESPONSE_FIELDS = `
  field
  currentPlayer
  possibleCoords {
    y
    x
  }
  winner
  id
`;

export const INIT_GAME = gql`
    mutation InitGame {
        initGame {
            ${GAME_RESPONSE_FIELDS}
        }
    }
`;

export const GET_GAME = gql`
    query GetGame($id: String!) {
        game(id: $id) {
            ${GAME_RESPONSE_FIELDS}
        }
    }
`;

export const MAKE_MOVE = gql`
    mutation MakeMove($move: MoveInput!) {
        makeMove(move: $move) {
            ${GAME_RESPONSE_FIELDS}
        }
    }
`;

export const GAME_SUBSCRIPTION = gql`
    subscription OnGame($id: String!) {
        game(id: $id) {
            ${GAME_RESPONSE_FIELDS}
        }
    }
`;