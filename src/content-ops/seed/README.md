# Content-Ops Seed Data

This directory contains scripts and data for populating the regulatory database.

## Usage

```bash
# Run the seed script
npx prisma db seed

# Or directly
npx ts-node prisma/seed.ts
```

## Seed Data Contents

- **6 countries**: US, DE, GB, AU, CA, JP
- **8 airlines**: Lufthansa, British Airways, United, Qantas, Air Canada, ANA, Delta, American Airlines
- **5 routes**: USA→Germany (SUPPORTED), USA→UK, USA→Australia, USA→Canada, USA→Japan (all NOT_STARTED)
- **6 requirements** for USA→Germany dog route with full source versioning

## Adding New Requirements

1. Create a `RequirementSource` with the official URL
2. Create a `SourceVersion` snapshot
3. Create the `Requirement` (route, species, category, severity)
4. Create a `RequirementVersion` with typed rule params

All requirements must have:
- A verified source URL
- A content hash snapshot
- A last-verified date
- Deterministic, tested evaluation rules
