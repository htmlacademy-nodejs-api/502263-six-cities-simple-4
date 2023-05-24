export const TSV_SEPARATOR = {
  /** Используется для разделения элементов перечислений внутри строки. (пр. 'Красное,Желтое,Зеленое') */
  String: ',',
  /** Используется для разделения сущностей в одной TSV строке. (пр. 'Красное	112122	London') */
  Tab: '	',
};

export const CHUNK_SIZE = {
  /** 16КВ */
  Read: 2 ** 14,
  /** 64KB */
  Write: 2 ** 16
};

export const DB = {
  RetryConnections: {
    Count: 5,
    Timeout: 1_000,
  },
  Default: {
    Port: '27017',
    UserPassword: '123456',
  }
};
