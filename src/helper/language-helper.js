import { en } from "@/language";
const resolveLanguageSlug = (slug) => {
  if (en[slug]) {
    return en[slug];
  } else {
    throw new Error(`'${slug}' not found in language.`);
  }
};

export { resolveLanguageSlug };
