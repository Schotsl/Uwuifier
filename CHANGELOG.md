# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.1] - 2027-05-25

### Changed
- Fixed description, engine, homepage and description properties in `package.json`

### Removed
- Removed unused `utils` and `seed` type files

## [4.0.0] - 2021-05-25

Node 14 is currently LTS, so we’ve dropped support for Node 10 and 12. We’ve also reduced the bundle size by removing unused files

### Changed
- Reduced bundle size

### Removed
- Dropped support for Node 11 & 12


## [3.0.0] - 2021-04-07

It's not the fastest, it's not the lightest but it probably is the most advanced Uwuifier! Made for [Deno](https://github.com/Schotsl/Uwuifier-deno) and [Node](https://github.com/Schotsl/Uwuifier-node) and the [web](https://github.com/Schotsl/Uwuifier-node)

### Added

- Support for `yarn` and `pnpm` instead of only `npm`
- Added more UwU faces

### Changed

- Switched to default export, in every version after v3.0.0 the `Uwuifier` class needs to be imported like this: `import Uwuifier from 'uwuifier';` instead of the old `import { Uwuifier } from 'uwuifier;`