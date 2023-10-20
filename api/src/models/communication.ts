import {
	Model,
	Column,
	Table,
	PrimaryKey,
	AutoIncrement,
	ForeignKey,
	BelongsTo,
	BelongsToMany,
} from 'sequelize-typescript';
import {
	Organizations,
	OrganizationLocations,
	Contacts,
	CommunicationContacts,
	Users,
	CommunicationUsers,
	CommunicationOrganizations,
} from '.';

@Table({ tableName: 'Communications' })
export class Communications extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
		id!: number;

	@Column
		date!: Date;

	@Column
		type!: string;

	@ForeignKey(() => Organizations)
	@Column
		organizationId?: number;

	@ForeignKey(() => OrganizationLocations)
	@Column
		locationId?: number;

	@Column
		note?: string;

	@BelongsTo(() => OrganizationLocations, 'locationId')
		organizationLocation!: OrganizationLocations;

	@BelongsToMany(() => Organizations, () => CommunicationOrganizations, 'CommunicationId', 'OrganizationId')
		organizations!: Organizations[];

	@BelongsToMany(() => Contacts, () => CommunicationContacts, 'CommunicationId', 'ContactId')
		contacts!: Contacts[];

	@BelongsToMany(() => Users, () => CommunicationUsers, 'CommunicationId', 'UserId')
		users!: Users[];
}
