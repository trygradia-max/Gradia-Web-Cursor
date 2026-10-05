/* Site-wide feature flags. Flip only when the matching evidence gate clears. */

/** Hidden until prices, entitlements, usage terms and live billing match.
 *  Do not publish checkout prices. Middleware + this flag double-gate /pricing. */
export const SHOW_PRICING = false;

/** Hidden until real-call, forwarding and number-continuity acceptance pass. */
export const SHOW_RECEPTIONIST = false;

/** Fleet accounts are out of scope. Page kept, flag-hidden from nav/sitemap/middleware. */
export const SHOW_FLEET_INDUSTRY = false;
