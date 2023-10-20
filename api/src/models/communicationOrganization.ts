import { Model, Column, Table, ForeignKey, PrimaryKey } from 'sequelize-typescript';
import { Communications, Organizations } from '.';

@Table({ tableName: 'CommunicationOrganizations' })
export class CommunicationOrganizations extends Model {
	@PrimaryKey
	@ForeignKey(() => Communications)
	@Column
		CommunicationId!: number;

	@PrimaryKey
	@ForeignKey(() => Organizations)
	@Column
		OrganizationId!: number;
}
