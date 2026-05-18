import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
// 경로 점검: 상위 폴더 두 번 이동(entities 벗어나고 users 벗어남) 후 posts/entities로 진입
import { Post } from '../../posts/entities/post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ['USER', 'LESSOR', 'REALTOR'],
    default: 'USER',
  })
  role: 'USER' | 'LESSOR' | 'REALTOR';

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]; // 이제 Post 파일을 정상적으로 읽어오므로 unknown 에러가 사라집니다!

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
