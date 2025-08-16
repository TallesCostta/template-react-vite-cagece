import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes do Tailwind CSS de forma inteligente, evitando conflitos.
 * @param inputs - Uma lista de valores de classe (strings, objetos, etc.).
 * @returns Uma string com as classes combinadas.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}