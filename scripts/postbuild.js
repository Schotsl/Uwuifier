import { existsSync, rmSync } from 'fs';

const PATHS = [
    './dist/types/utils',
];

for (const PATH of PATHS) {
    if (existsSync(PATH)) {
        rmSync(PATH, { recursive: true });
    }
}