/* Site-wide feature flags (Pass 5 subpages). Flip only when the matching gate clears. */

/** Hidden until P0-013 ships — page built, middleware + this flag double-gate /pricing. */
export const SHOW_PRICING = false;

/** Hidden until the telephony acceptance run passes — homepage section + /receptionist route. */
export const SHOW_RECEPTIONIST = false;

/** Fleet accounts are out of scope (D-067). Page kept, flag-hidden from nav/sitemap/middleware. */
export const SHOW_FLEET_INDUSTRY = false;
