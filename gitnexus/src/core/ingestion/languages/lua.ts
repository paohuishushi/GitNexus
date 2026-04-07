/**
 * Lua Language Provider
 *
 * Assembles Lua-specific ingestion capabilities following the Strategy pattern.
 *
 * Key Lua traits:
 *   - importSemantics: 'wildcard' (require() returns the entire module)
 *   - OOP via metatables: class/method nodes detected via tree-sitter queries
 */
import { SupportedLanguages } from 'gitnexus-shared';
import { defineLanguage } from '../language-provider.js';
import { typeConfig as luaTypeConfig } from '../type-extractors/lua.js';
import { luaExportChecker } from '../export-detection.js';
import { resolveLuaImport } from '../import-resolvers/lua.js';
import { LUA_QUERIES } from '../tree-sitter-queries.js';

export const luaProvider = defineLanguage({
  id: SupportedLanguages.Lua,
  extensions: ['.lua'],
  treeSitterQueries: LUA_QUERIES,
  typeConfig: luaTypeConfig,
  exportChecker: luaExportChecker,
  importResolver: resolveLuaImport,
  importSemantics: 'wildcard',
});
