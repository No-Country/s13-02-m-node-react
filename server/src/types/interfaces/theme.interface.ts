import { LEVELS } from '../../config/constants/levels';

export interface ITheme {
  name: string;
  level: LEVELS;
  order: number;
  description?: string;
  points: number;
}
