import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../../user/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: TaskStatus;

  @ManyToOne(() => User, user => user.tasks,
    {
      eager: false,
      nullable: false,
    })
  user: User
}

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}
