/**
 * Lua import resolver.
 *
 * Resolves `require("a.b.c")` to file paths by converting dots to slashes.
 * Resolution order (mirrors Lua's package.path):
 *   1. <callerDir>/a/b/c.lua
 *   2. <callerDir>/a/b/c/init.lua
 *   3. a/b/c.lua          (root-relative, no prefix)
 *   4. a/b/c/init.lua     (root-relative, no prefix)
 */
import path from 'node:path';
import type { ImportResult, ResolveCtx } from './types.js';

/** Strip surrounding quotes from a Lua string literal node text. */
function stripQuotes(raw: string): string {
  return raw.replace(/^['"]|['"]$/g, '');
}

/** Convert a Lua module path ("a.b.c") to a relative file path ("a/b/c"). */
function moduleToPath(moduleName: string): string {
  return moduleName.replace(/\./g, '/');
}

export function resolveLuaImport(
  rawImportPath: string,
  filePath: string,
  ctx: ResolveCtx,
): ImportResult {
  const moduleName = stripQuotes(rawImportPath);
  const relPath = moduleToPath(moduleName);

  // Normalize callerDir to forward slashes for comparison against the indexed file set
  const callerDir = path.dirname(filePath).replace(/\\/g, '/');

  // Candidate paths in resolution order
  const candidates = [
    `${callerDir}/${relPath}.lua`,
    `${callerDir}/${relPath}/init.lua`,
    `${relPath}.lua`,
    `${relPath}/init.lua`,
  ];

  for (const candidate of candidates) {
    if (ctx.allFilePaths.has(candidate)) {
      return { kind: 'files', files: [candidate] };
    }
  }

  // Unresolved external package
  return null;
}
