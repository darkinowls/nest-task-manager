import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from '../../tasks/entities/task.entity';

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

  @Column({ nullable: true }) // Nullable because initially, the user might not have an image
  avatarImage: string; // Field to store the path or URL of the image

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
