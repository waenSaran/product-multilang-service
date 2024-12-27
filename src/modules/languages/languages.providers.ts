import { LANGUAGE } from 'src/constants/language.constant';
import { Language } from 'src/core/db/models/language.model';

export const languagesProviders = [
  {
    provide: LANGUAGE.REPOSITORY,
    useValue: Language,
  },
];
