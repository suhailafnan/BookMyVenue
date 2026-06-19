# Code Audit

## Problems Found

- The homepage search section used two inputs and a link, so it could not submit category/city/search together and broke on smaller widths.
- About and Contact pages were placeholders.
- Some venue components are legacy single-purpose components and are not referenced by active routes.
- A legacy `products/[id]` route overlaps with the canonical venue details route.
- API integration existed in a feature-local wrapper and needed a shared `services/` layer.
- The README did not fully document architecture, setup, API routes, or data flow.

## REMOVE

These files appear unused by active routes. Remove only after confirming no external imports rely on them.

```text
frontend/website/src/features/venues/components/AdvancedSearchBar.tsx
frontend/website/src/features/venues/components/Hero.tsx
frontend/website/src/features/venues/components/SearchBar.tsx
frontend/website/src/features/venues/components/SectionTitle.tsx
frontend/website/src/features/venues/components/VenueAmenities.tsx
frontend/website/src/features/venues/components/VenueDetails.tsx
frontend/website/src/features/venues/components/VenueGallery.tsx
frontend/website/src/features/venues/components/VenueLocation.tsx
frontend/website/src/features/venues/components/VenuePricing.tsx
frontend/website/src/app/products/[id]/page.tsx
frontend/website/src/components/Footer.module.css
```

## KEEP

```text
backend/src/config
backend/src/controllers
backend/src/middleware
backend/src/models
backend/src/routes
backend/src/services
backend/src/utils
backend/src/seed
frontend/website/src/app
frontend/website/src/components
frontend/website/src/features/contact
frontend/website/src/features/venues/components/HomeSearch.tsx
frontend/website/src/features/venues/components/VenueCard.tsx
frontend/website/src/features/venues/components/VenueExplorer.tsx
frontend/website/src/features/venues/components/VenueFilters.tsx
frontend/website/src/features/venues/components/VenueGrid.tsx
frontend/website/src/hooks
frontend/website/src/lib
frontend/website/src/services
frontend/website/src/types
```

## REFACTOR

```text
frontend/website/src/app/venues/[id]/page.tsx
```

The details route is functional, but it can be split into smaller feature components later:

- `VenueHero`
- `VenueGallery`
- `VenueAmenitiesPanel`
- `VenueContactPanel`
- `RelatedVenues`

```text
frontend/website/src/app/page.tsx
```

The homepage is improved and backend-connected. A future pass can split section blocks into `features/home/components`.

