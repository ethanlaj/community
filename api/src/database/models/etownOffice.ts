import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, HasMany } from 'sequelize-typescript';
import { Users } from './user';

@Table({ tableName: 'EtownOffices' })
export class EtownOffices extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	public id!: number;

	@Column({ type: DataType.STRING, allowNull: false })
	public name!: string;

	@HasMany(() => Users, 'officeId')
		users?: Users[];
}
