import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AutoIncrement,
	DataType,
	BelongsToMany,
	HasMany
} from 'sequelize-typescript';
import { CommunicationContacts, OrganizationContacts, Organizations } from '.';

@Table({ tableName: 'Contacts' })
export class Contacts extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
		id!: number;

	@Column({ type: DataType.STRING(100), allowNull: false })
		name!: string;

	@BelongsToMany(() => Organizations, () => OrganizationContacts, 'contactId', 'organizationId')
		organizations?: Organizations[];

	@BelongsToMany(() => Contacts, () => CommunicationContacts)
		contacts?: Contacts[];

	@HasMany(() => OrganizationContacts, 'contactId')
		organizationContacts?: OrganizationContacts[];

}
