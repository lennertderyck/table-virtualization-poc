import { RowSelectionMode } from "../Table.types";

export const getRowSelectableRule = (mode: RowSelectionMode | undefined) => {
  if (mode === undefined || mode === 'none') return false;
  else return true;
}