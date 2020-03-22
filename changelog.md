# Architect Parser changelog

---

## [2.1.1] 2020-03-22

### Added

- Added user-friendly errors for common schema validation issues


### Changed

- If schema validation errors are present, `readArc()` errors now returns a string, and not an array of errors
- Updated dependencies

---

## [2.1.0] 2020-03-01

### Added

- Parser now returns a default Architect project if one is not found in the root of the working directory


### Changed

- Updated dependencies

---

## [2.0.2] 2-18-2020

### Added

- Adds rollup for creating node and browser builds (run `npm run build` if you want those)


### Changed

- `@aws` pragma no longer required by `schema.json`

---

## [2.0.1] 12-26-19

### Fixed
- Resolved issue preventing some pragmas from not serializing correctly; fixes #33


### Changed

- Removed lockfile

---

## [2.0.0] 12-13-19

### Added

- Adds `schema.json` and JSON schema validation
- Adds `arc.toml` support
- Adds `read` method
- Adds `/examples` and `/doc`

### Changed

- Complete lexer / parser rewrite
