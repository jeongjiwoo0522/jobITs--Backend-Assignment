import { Entity, PrimaryColumn } from "typeorm";

@Entity("image")
export class Image {
  @PrimaryColumn("uuid")
  id: string;

  @PrimaryColumn("string")
  path: string;
}