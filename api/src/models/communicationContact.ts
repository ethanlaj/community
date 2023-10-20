import { Model, Column, Table, ForeignKey, PrimaryKey } from 'sequelize-typescript';
import { Contacts, Communications } from '.';

@Table({ tableName: 'CommunicationContacts' })
export class CommunicationContacts extends Model {
	@PrimaryKey
	@ForeignKey(() => Communications)
	@Column
		CommunicationId!: number;

	@PrimaryKey
	@ForeignKey(() => Contacts)
	@Column
		ContactId!: number;

	@Column
		createdAt!: Date;

	@Column
		updatedAt!: Date;
}
