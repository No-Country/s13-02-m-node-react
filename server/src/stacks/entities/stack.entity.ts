import { BaseEntity } from '../../config/base.entity';
import { ThemesEntity } from '../../themes/entities/theme.entity';
import { IStack } from '../../types/interfaces/stack.interface';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'stacks' })
export class StacksEntity extends BaseEntity implements IStack {
  @Column({ unique: true, nullable: false })
  name: string;
  @BeforeInsert()
  @BeforeUpdate()
  async toLowerCase() {
    // Este método se ejecutará antes de insertar o actualizar la entidad
    this.name = await this.transformToLowerCase(this.name);
  }

  @Column()
  points: number;
  @OneToMany(() => ThemesEntity, (theme) => theme.stack)
  themes: ThemesEntity[];

  private async transformToLowerCase(value: string): Promise<string> {
    return value.toLowerCase();
  }
}
