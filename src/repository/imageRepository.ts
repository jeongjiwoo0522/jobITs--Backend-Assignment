import { Image } from "../model/image";
import { EntityManager, EntityRepository, Repository } from "typeorm";
import { ImageRepository } from "src/interface";

@EntityRepository(Image)
export class DatabaseImageRepository extends Repository<Image> implements ImageRepository {
  public async createNewImage(image: Image, manager: EntityManager) {
    await manager.save(this.create(image));
  }
}