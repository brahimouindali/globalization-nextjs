import { useRouter } from "next/router";

import dictionary from "@/locals/dictionary";

type DictionaryType = keyof typeof dictionary;

export const useTranslation = () => {
  const { locale } = useRouter();

  return {
    translate: (term: DictionaryType | DictionaryType[]) => {
      if (Array.isArray(term)) {
        const res = term.map((t) => {
          const translation =
            dictionary[t as DictionaryType][
              locale as keyof (typeof dictionary)[DictionaryType]
            ];

          return Boolean(translation) ? translation : t;
        });

        return res;
      }

      const translation =
        dictionary[term as DictionaryType][
          locale as keyof (typeof dictionary)[DictionaryType]
        ];

      return Boolean(translation) ? translation : term;
    },
  };
};
