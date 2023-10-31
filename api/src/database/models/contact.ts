import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AutoIncrement,
	DataType,
	BelongsToMany,
} from 'sequelize-typescript';
import { CommunicationContacts, Communications, OrganizationContacts, Organizations } from '.';

@Table({ tableName: 'Contacts' })
export class Contacts extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	public id!: number;

	@Column({ type: DataType.STRING, allowNull: false })
	public name!: string;

	@Column({ type: DataType.STRING(15), allowNull: true })
	public phone?: string;

	@Column({ type: DataType.STRING(45), allowNull: true })
	public email?: string;

	@BelongsToMany(() => Organizations, () => OrganizationContacts, 'contactId', 'organizationId')
		organizations?: Organizations[];

	@BelongsToMany(() => Communications, () => CommunicationContacts)
		communications?: Communications[];
}
