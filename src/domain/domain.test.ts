import fs from 'fs';
import path from 'path';

function listTsFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listTsFiles(entryPath);
    return entry.name.endsWith('.ts') ? [entryPath] : [];
  });
}

describe('domain layer', () => {
  it('only imports from within itself, not from frameworks or infrastructure', () => {
    const domainDir = __dirname;
    const files = listTsFiles(domainDir).filter((file) => !file.endsWith('.test.ts'));
    expect(files.length).toBeGreaterThan(0);

    for (const file of files) {
      const source = fs.readFileSync(file, 'utf-8');
      const importedModules = [...source.matchAll(/from ["']([^"']+)["']/g)].map(
        (match) => match[1]!,
      );

      for (const importedModule of importedModules) {
        expect(importedModule.startsWith('.')).toBe(true);
      }
    }
  });
});
