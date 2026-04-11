# FE-080 Taxonomy Contract

- MVP taxonomy contains the eight v1.2.2 codes.
- Labels carry `severity`, `labelConfidence`, and `role`.
- Each item can have at most one primary label and one optional secondary label.
- `item_errors.is_primary` persists the role into the database layer.
- Low-confidence labels are demoted before they can feed primary diagnosis aggregation.
