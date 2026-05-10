import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('posts') // DB에 'posts'라는 이름의 표가 생깁니다.
export class Post {
  @PrimaryGeneratedColumn() // 자동으로 1, 2, 3... 번호 부여
  id: number;

  @Column()
  category: string; // SafeJeonse, RecommendRealty 등

  @Column()
  title: string;

  @Column({ type: 'text' }) // 긴 글을 저장하기 위해 text 타입 사용
  content: string;

  @Column({ default: '사용자' })
  author: string;

  @Column({ default: 0 })
  views: number;

  // 💡 아래는 카테고리에 따라 선택적으로 사용될 필드들입니다.
  @Column({ nullable: true }) // 비어있어도 됨
  realtyName: string;

  @Column({ nullable: true })
  price: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  location: string;

  @CreateDateColumn() // 생성 시 자동으로 날짜 기록
  createdAt: Date;
}
