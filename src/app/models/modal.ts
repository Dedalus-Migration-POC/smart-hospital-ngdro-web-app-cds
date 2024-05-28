export enum Type {
  SUCCESS = 'SUCCESS',
  ERROR = 'DANGER',
  INFO = 'INFO',
  WARNING = 'WARNING'
}

export interface Modal {
  type: Type,
  title: string,
  body?: string,
  footer?: string,
  centered: boolean
}
