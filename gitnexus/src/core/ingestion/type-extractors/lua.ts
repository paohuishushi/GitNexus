/**
 * Lua type extractor.
 *
 * Lua has no static type system, so we only extract variable/parameter names.
 * Type inference (Tier 1+) is not applicable here.
 */
import type { SyntaxNode } from '../utils/ast-helpers.js';
import type { LanguageTypeConfig, ParameterExtractor, TypeBindingExtractor } from './types.js';

/** Node types that may carry a variable binding in Lua. */
const DECLARATION_NODE_TYPES: ReadonlySet<string> = new Set([
  'local_variable_declaration',
  'variable_assignment',
]);

/**
 * Extract local variable bindings.
 * Lua has no static types to extract — return immediately.
 */
const extractDeclaration: TypeBindingExtractor = (
  _node: SyntaxNode,
  _env: Map<string, string>,
): void => {
  // No static type to extract in Lua.
};

/**
 * Extract parameter names from function definitions.
 * Lua parameters have no type annotations.
 */
const extractParameter: ParameterExtractor = (
  _node: SyntaxNode,
  _env: Map<string, string>,
): void => {
  // Lua parameters have no inline type annotations — nothing to extract.
};

export const typeConfig: LanguageTypeConfig = {
  declarationNodeTypes: DECLARATION_NODE_TYPES,
  extractDeclaration,
  extractParameter,
};
