# Architect Parser changelog

---

## [6.0.0] 2022-01-23

### Changed

- Breaking change: removed `toml` support
- Stop publishing to the GitHub Package registry
- Updated PragmaNotFound error description
- Updated dependencies

---

## [5.0.2] 2021-10-11

### Changed

- Fix esoteric issue where a newline with nothing but trailing spaces following a map may blow up
- Updated dependencies

---

## [5.0.1] 2021-10-07

### Fixed

- Trailing newlines are no longer aggregated into `maps` and `vectors` in the AST

---

## [5.0.0] 2021-09-13

### Changed

- Breaking change: `parse.parser` now returns an AST object
- Moved JSON schemas to the [Arc syntaxes repo](https://github.com/architect/syntaxes)


### Added

- `parse.parser` accepts lexeme tokens and returns an AST object (with comments preserved)
- `parse.compiler` accepts an AST and returns one of `arc`, `json`, or `yaml` (`toml` support planned)


### Fixed

- Windows style newline `\r\n` was not being accounted for and could result in buggy reads
- `.arc` map objects will throw if a key is undefined

---

## [4.0.0 - 4.0.1] 2021-07-22

### Changed

- Breaking change: removed support for Node.js 10.x (now EOL, and no longer available to created in AWS Lambda) and Node.js 12.x and Node.js 12.x
- Updated dependencies
- Updated vendored dependencies (`js-yaml`, `toml`)

---

## [3.0.1] 2020-12-02

### Added

- Added i18n support for non-ascii string chars


### Fixed

- Fixed missing tilde from supported string chars

---

## [3.0.0] 2020-11-20

### Added

- Added support for new verbose format in `arc.json` + `arc.yaml`


### Changed

- Breaking change: remove filesystem methods (`read`, `readArc`) deprecated, with that role now taken over by Inventory
- Disabled JSON schema validation, to be moved to Inventory

---

## [2.3.0] 2020-10-01

### Added

- Add support for `@proxy` pragma for passing through requests via `@http` to an external site
- Add support for `@http` catchall syntax (e.g. `get /api/*`)
- Add support for `@http` `any` method syntax (e.g. `any /path`)
- Add support for `@http` `head` + `options` methods

---

## [2.2.0] 2020-08-11

### Added

- Added support for reading and validating Architect function config files (`config.arc`, `.arc-config`, `arc-config.[json|yaml|yml|toml]`) with `readArcConfig()`


### Fixed

- Fixed missing support for the following `@aws` settings: `layer` (alternatively `layers`), `memory`, `policy` (alternatively `policies`), and `timeout`

---

## [2.1.6] 2020-08-04

### Added

- Adds support for `@aws apigateway http[v1|v2]|rest`

---

## [2.1.5] 2020-06-10

### Added

- Adds support for `@static prune true|false`

---

## [2.1.4] 2020-06-04

### Added

- Adds support for `@static fingerprint external` and `@static prefix whatever-folder`


### Fixed

- Fixed schema to accept objects as items in the `@static` pragma, thanks @filmaj!

---

## [2.1.3] 2020-03-25

### Fixed

- Fixes issues where values (usually environment variables in `.arc-env`) that start with a leading digit may be miscategorized and return a `NaN`

---

## [2.1.1 - 2.1.2] 2020-03-22

### Added

- Added user-friendly errors for common schema validation issues


### Changed

- If schema validation errors are present, `readArc()` errors now returns a string, and not an array of errors
- Updated dependencies


### Fixed

- Resolved schema validation errors for `@static staging / production`

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
