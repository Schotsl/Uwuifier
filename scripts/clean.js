import { existsSync, rmSync } from 'fs';

const DIST_PATH = './dist';

if (existsSync(DIST_PATH)) {
    rmSync(DIST_PATH, { recursive: true });
}