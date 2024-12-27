import { Language } from '../types/language';

export class CreateLanguageDto implements Language {
  code: string;
  langName: string;
  localName?: string;
}
