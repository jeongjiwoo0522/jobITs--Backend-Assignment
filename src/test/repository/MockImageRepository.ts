import { EntityManager } from "typeorm";
import { ImageRepository, Image } from "../../interface";

export class MockImageRepository implements ImageRepository {
  private constructor() {}
  private static _instance: MockImageRepository;

  public static get instance(): MockImageRepository {
    if(!MockImageRepository._instance) {
      MockImageRepository._instance = new MockImageRepository();
    }
    return MockImageRepository._instance;
  }

  public async createNewImage(image: Image, manager: EntityManager): Promise<void> {
    
  }
}