import { EntityManager } from "typeorm";
import { Image } from "./image";

export interface ImageRepository {
  createNewImage(image: Image, manager: EntityManager): Promise<void>;
}