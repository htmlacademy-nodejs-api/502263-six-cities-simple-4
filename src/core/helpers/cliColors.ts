import chalk from 'chalk';

/** Фиксирует цвета для консольных выводов */
export const getCliTextColor = {
  success: (str: string) => chalk.green(str),
  warning: (str: string) => chalk.yellow(str),
  error: (str: string) => chalk.red(str),
  code: (str: string) => chalk.blue(str),
  info: (str: string) => chalk.gray(str),
};
