import {Cell} from "./types";

type CellColors = {[key in Cell]: string};

export const cellColors: CellColors = {
  1: 'blue',
  2: 'yellow',
  0: 'gray',
};