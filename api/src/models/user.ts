import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AutoIncrement,
	DataType,
	ForeignKey,
  } from 'sequelize-typescript';
  import EtownOffices  from './etownOffice';
  
  @Table({ tableName: 'Users' })
  export default class Users extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	public id!: number;
  
	@ForeignKey(() => EtownOffices)
	@Column({ type: DataType.INTEGER, allowNull: true })
	public officeId?: number;
  
	@Column({ type: DataType.INTEGER, allowNull: false })
	public permissionLevel!: number;
  }
  