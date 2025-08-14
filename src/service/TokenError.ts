export class TokenError extends Error {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, TokenError.prototype);
  }
}