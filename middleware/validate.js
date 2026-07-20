import { sendError } from "../utils/response.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return sendError(res, 400, "Name must be a string with at least 2 characters");}

  if (!email || typeof email !== "string" || !emailRegex.test(email)) {
    return sendError(res, 400, "A valid email is required");}

  if (!password || typeof password !== "string" || password.length < 6) {
    return sendError(res, 400, "Password must be at least 6 characters");}

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || typeof email !== "string" || !emailRegex.test(email)) {
    return sendError(res, 400, "A valid email is required");}

  if (!password || typeof password !== "string") {
    return sendError(res, 400, "Password is required");}

  next();
};

export const validateCreateUser = (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return sendError(res, 400, "Name must be a string with at least 2 characters");}

  if (!email || typeof email !== "string" || !emailRegex.test(email)) {
    return sendError(res, 400, "A valid email is required");}

  if (!password || typeof password !== "string" || password.length < 6) {
    return sendError(res, 400, "Password must be at least 6 characters");}

  if (role && !["user", "admin"].includes(role)) {
    return sendError(res, 400, "Role must be either 'user' or 'admin'");}

  next();
};