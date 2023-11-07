import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AutoIncrement,
	DataType,
	BelongsToMany,
	HasMany,
	NotNull,
	Default,
	Max
} from 'sequelize-typescript';
import { CommunicationOrganizations, Communications, Contacts, OrganizationContacts, OrganizationLocations } from '.';
import { OrganizationAliases } from './organizationAliases';

@Table({ tableName: 'Organizations' })
export class Organizations extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	public id!: number;

	@Column({ type: DataType.STRING, allowNull: false })
	public name!: string;

	@BelongsToMany(() => Contacts, () => OrganizationContacts, 'organizationId', 'contactId')
		contacts?: Contacts[];

	@HasMany(() => OrganizationLocations, 'organizationId')
		organizationLocations?: OrganizationLocations[];

	@BelongsToMany(() => Communications, () => CommunicationOrganizations)
		communications?: Communications[];

	@HasMany(() => OrganizationAliases)
		aliases?: OrganizationAliases[];

	@HasMany(() => OrganizationContacts, 'organizationId')
		organizationContacts?: OrganizationContacts[];

		@NotNull
		@Default(0)
		@Max(3) 
		@Column(DataType.TINYINT)
			flag!: number;
	
	
}
