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
import { ContactAliases } from './contactAliases';

@Table({ tableName: 'Contacts' })
export class Contacts extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
		id!: number;

	@Column({ type: DataType.STRING(100), allowNull: false })
		first_name!: string;
	
	@Column({ type: DataType.STRING(100), allowNull: false })
		last_name!: string;

	private _full_name?: string;

	// Virtual property to concatenate first_name and last_name
	get name(): string {
		if (!this._full_name) {
			return `${this.first_name} ${this.last_name}`;
		}
		return this._full_name;
	}

	set name(value: string) {
		// Assuming the full name is in the format "First Last"
		const names = value.split(' ');
		this.first_name = names[0];
		this.last_name = names[1] || '';
		this._full_name = value;
	}

	@BelongsToMany(() => Organizations, () => OrganizationContacts, 'contactId', 'organizationId')
		organizations?: Organizations[];

	@BelongsToMany(() => Contacts, () => CommunicationContacts)
		contacts?: Contacts[];

	@HasMany(() => OrganizationContacts, 'contactId')
		organizationContacts?: OrganizationContacts[];

	@HasMany(() => ContactAliases)
		aliases?: ContactAliases[];
}
