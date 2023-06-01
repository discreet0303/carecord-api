/**
 * Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
 */
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
