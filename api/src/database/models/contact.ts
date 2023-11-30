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
import { CommunicationContacts, Communications, OrganizationContacts, Organizations } from '.';
import { ContactAliases } from './contactAliases';

@Table({ tableName: 'Contacts' })
export class Contacts extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
		id!: number;

	@Column(DataType.VIRTUAL(DataType.STRING))
	get name(): string {
		return this.getDataValue('first_name') + ' ' + this.getDataValue('last_name');
	}

	@Column({ type: DataType.STRING(100), allowNull: false })
		first_name!: string;
	
	@Column({ type: DataType.STRING(100), allowNull: false })
		last_name!: string;

	@BelongsToMany(() => Organizations, () => OrganizationContacts, 'contactId', 'organizationId')
		organizations?: Organizations[];

	@BelongsToMany(() => Communications, () => CommunicationContacts)
		communications?: Communications[];

	@HasMany(() => OrganizationContacts, 'contactId')
		organizationContacts?: OrganizationContacts[];

	@HasMany(() => ContactAliases)
		aliases?: ContactAliases[];
}
