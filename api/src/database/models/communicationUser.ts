import { Model, Column, Table, ForeignKey, PrimaryKey } from 'sequelize-typescript';
import { Communications, Users } from '.';

@Table({ tableName: 'CommunicationUsers' })
export class CommunicationUsers extends Model {
	@PrimaryKey
	@ForeignKey(() => Communications)
	@Column
		CommunicationId!: number;

	@PrimaryKey
	@ForeignKey(() => Users)
	@Column
		UserId!: number;

	@Column
		createdAt!: Date;

	@Column
		updatedAt!: Date;
}
