import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "@src/tasks/entities/task.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({
    unique: true
  })
  email: string;

  @Column(
  )
  password: string;


  @Column()
  name: string;

  @OneToMany(() => Task, task => task.user,
    {
      eager: true,
      onDelete: "CASCADE"
    }
  )
  tasks: Task[];

}
