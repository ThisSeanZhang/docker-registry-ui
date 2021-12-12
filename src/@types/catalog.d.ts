export type CataLog = {
  repositories: string[],
};
export type MenuItem = {
  label: string,
  key: string,
  icon?: any,
  children?: MenuItem[],
}