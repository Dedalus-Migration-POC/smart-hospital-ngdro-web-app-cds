import { IconName, IconPrefix } from '@fortawesome/free-regular-svg-icons';
import { IconLookup } from '@fortawesome/free-solid-svg-icons';

export enum Type {
  SUCCESS = 'SUCCESS',
  ERROR = 'DANGER',
  INFO = 'INFO',
  WARNING = 'WARNING',
}

export interface Alert {
  title: string;
  body: string;
  styleClass?: string;
  icon?: [IconPrefix, IconName] | IconLookup;
  iconClass?: string;
  type: Type;
}

export interface Modal extends Alert {
  centered: boolean;
}
