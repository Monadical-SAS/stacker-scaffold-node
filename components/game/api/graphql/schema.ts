import { gql } from 'apollo-server-core'

export const typeDefs = gql`
    type Coords {
        x: Int!,
        y: Int!,
    }
    input CoordsInput {
        x: Int!,
        y: Int!,
    }
    type Game {
        field: [[Int]]!,
        currentPlayer: Int,
        possibleCoords: [Coords]!,
        winner: Int,
        id: String!,
    }

    input MoveInput {
        player: Int,
        coords: CoordsInput,
        gameId: String!
    }
    type Query {
        game(id: String!): Game,
    }
    type Mutation {
        makeMove(move: MoveInput!): Game!,
        initGame: Game!,
    }
    type Subscription {
        game(id: String!): Game,
    }
`;