export type TSearchConditions<T> = {
  field: keyof T;
  value: string;
};
