import { AbstractEntity } from '../common/entities/abstract.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInfo } from './userInfo.entity';
import { Like } from './like.entity';
import { Post } from './post.entity';

@Entity()
export class Comment extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column('jsonb', { nullable: true })
  mediaPath: string[];

  @Column({ nullable: true })
  postId: string;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => Post, (post) => post.comment)
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: Post;

  @ManyToOne(() => UserInfo, (user) => user.comment)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserInfo;

  @OneToMany(() => Like, (like) => like.post, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  likeList: Like[];

  constructor(comment: Partial<Comment>) {
    super();
    Object.assign(this, comment);
  }
}
