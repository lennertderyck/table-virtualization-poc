import { AvailableIcons } from "../../../basics/Icon/Icon.types";
import { ColumnPinRule, ColumnSortDirection, ColumnSortRule } from "../Table.types";

export const getColumnSortRuleIcon = (sortDirection: ColumnSortDirection): AvailableIcons => {
  if (sortDirection === 'asc') return 'sort-alphabet-asc';
  if (sortDirection === 'desc') return 'sort-alphabet-desc';
  return 'sort-alphabet-asc';
}

export const getColumnSortRule = (columnSort: ColumnSortRule[], accessor: string) => {
  return columnSort?.find((rule) => rule.accessor === accessor) || null;
}

export const switchColumbSortDirection = (direction: ColumnSortDirection): ColumnSortDirection => {
  if (direction === undefined || direction === null) return 'asc';
  if (direction === 'asc') return 'desc';
  if (direction === 'desc') return null;
  return 'asc';
}

export const mergeColumnSortRules = (rules: ColumnSortRule[], updatedRule: ColumnSortRule) => {
  if (rules.length === 0) return [updatedRule];
  return rules.flatMap((rule, index, all) => {
    if (rule.accessor === updatedRule.accessor) return updatedRule; // If rule accessors match, return the updated rule
    else if (index === all.length - 1) return [...all, updatedRule]; // If current checked rule is the last one, return all rules and add the updated rule since this accessor is not present
    else return rule; // Otherwise return the rule because this rule does not match the updated rule and should not be updated
  });
}

export const mergeColumnPinRules = (rules: ColumnPinRule[], updatedRule: ColumnPinRule) => {
  if (rules.length === 0) return [updatedRule];
  return rules.flatMap((rule, index, all) => {
    if (rule.accessor === updatedRule.accessor) return updatedRule; // If rule accessors match, return the updated rule
    else if (index === all.length - 1) return [...all, updatedRule]; // If current checked rule is the last one, return all rules and add the updated rule since this accessor is not present
    else return rule; // Otherwise return the rule because this rule does not match the updated rule and should not be updated
  });
}