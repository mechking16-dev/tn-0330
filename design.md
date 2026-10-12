# TN Footwear — Design direction
Approved: off-white, charcoal and forest green. Premium independent sneaker boutique, documentary catalogue photography, not luxury-brand claims.

## Identity
Provisional custom typographic TN FOOTWEAR wordmark; not the retailer's verified logo. Public TikTok avatar is a product photo, not a logo. Green is an approved design proposal, not extracted brand identity.
Palette: canvas #F5F3EE, ink #171717, forest #285943, muted #666960, hairline #D9DAD2. Forest CTAs, off-white surfaces, small lime-tinted labels. No gradients, glowing effects or decorative round cards.
Typography: self-hosted Barlow Condensed bold for editorial headlines, Arial/system sans for body. Condensed large hero, compact tracking on uppercase labels. 12–16px body, 44–90px display.

## Layout and UX
Single responsive web page: Home hero, Shop catalogue, About process + shop, Contact store details. Compact header and accessible mobile menu. Asymmetric split hero with real street product photograph; dark brand strip; 3-column catalogue desktop, 2-column phone; 6 product references. Sharp cards, consistent 4:5 cropped images, unobtrusive demo note and photo/source disclosure. Product preview dialog with size selection, SKU, source and enquiry draft. Native dialog keyboard focus containment, Escape close, restored focus. Category filters, search and sort with reset.
Catalogue imagery from publicly posted TN account, reuse authorised by user in this conversation. Generic descriptive labels do not certify manufacturer authenticity. Prices/sizes illustrative; availability unknown. WhatsApp destination remains disabled until owner confirmation; show encoded message preview rather than silently navigate.

## Architecture
Managed Bun/Vite/React/TypeScript web package. No new dependency, custom API, database table, authentication, cart or payment. Keep platform template infrastructure and analytics intact. Data in src/web/data/products.ts; business and launch controls in src/web/data/config.ts; enquiry URL builder in lib/enquiry.ts; main UI in pages/catalogue.tsx. Static images/font/favicon only in packages/web/public.
