import { BusinessLogic } from "../interface";

export const tryCatchHandler = (myFunc: BusinessLogic): BusinessLogic => {
  return async (req, res, next) => {
    try {
      await myFunc(req, res, next);
    } catch(err) {
      next(err);
    }
  }
}
