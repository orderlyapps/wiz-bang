/**
 * Utility functions for handling permission keys with type safety
 */

export type PermissionKey = `${string}:${string}`;

/**
 * Validates if a string is a valid permission key format (auth_user_id:congregation_id)
 */
export function isValidPermissionKey(key: string): key is PermissionKey {
  const parts = key.split(":");
  return parts.length === 2 && parts[0].length > 0 && parts[1].length > 0;
}

/**
 * Parses a permission key into its components
 */
export function parsePermissionKey(key: PermissionKey): {
  auth_user_id: string;
  congregation_id: string;
} {
  const [auth_user_id, congregation_id] = key.split(":");
  return { auth_user_id, congregation_id };
}

/**
 * Creates a permission key from components
 */
export function createPermissionKey(auth_user_id: string, congregation_id: string): PermissionKey {
  return `${auth_user_id}:${congregation_id}`;
}

/**
 * Type guard to check if a value is a permission key
 */
export function isPermissionKey(value: unknown): value is PermissionKey {
  return typeof value === "string" && isValidPermissionKey(value);
}
