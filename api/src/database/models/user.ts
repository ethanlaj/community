import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AutoIncrement,
	DataType,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript';
import { EtownOffices } from '.';

@Table({ tableName: 'Users' })
export class Users extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	public id!: number;

	@ForeignKey(() => EtownOffices)
	@BelongsTo(() => EtownOffices, 'officeId')
		office!: EtownOffices;

	@Column({ type: DataType.INTEGER, allowNull: false })
	public officeID!: number;

	@Column({ type: DataType.INTEGER, allowNull: false })
	public permissionLevel!: number;

	@Column({ type: DataType.STRING, allowNull: false })
	public email!: string;

	@Column({ type: DataType.STRING, allowNull: false })
	public name!: string;
	
}
