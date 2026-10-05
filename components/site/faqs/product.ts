/** Product-page FAQ — visible UI + FAQPage JSON-LD on /product. */

import type { FaqItem } from "./home";
import { HOME_FAQS } from "./home";

export const PRODUCT_FAQS: FaqItem[] = HOME_FAQS.filter((item) =>
  [
    "What is Gradia?",
    "Can I use it today?",
    "Does Gradia send messages or make bookings without asking?",
    "Which channels will the pilot support?",
    "Does Gradia take payments or manage work orders?",
    "Is there a free trial?",
  ].includes(item.q),
);
