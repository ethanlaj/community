import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table({ tableName: 'EtownOffices' })
export class EtownOffices extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	public id!: number;

	@Column({ type: DataType.STRING, allowNull: false })
	public name!: string;
}
