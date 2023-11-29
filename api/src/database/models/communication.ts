import {
	Model,
	Column,
	Table,
	PrimaryKey,
	AutoIncrement,
	ForeignKey,
	BelongsTo,
	BelongsToMany,
	DataType,
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

	@Column({ type: DataType.STRING(10), allowNull: false })
		type!: string;

	@ForeignKey(() => OrganizationLocations)
	@Column
		locationId?: number;

	@Column({ type: DataType.STRING(1024), allowNull: false })
		note?: string;

	@BelongsTo(() => OrganizationLocations, 'locationId')
		organizationLocation!: OrganizationLocations;

	@BelongsToMany(() => Organizations, () => CommunicationOrganizations)
		organizations?: Organizations[];

	@BelongsToMany(() => Contacts, () => CommunicationContacts, 'CommunicationId', 'ContactId')
		contacts!: Contacts[];

	@BelongsToMany(() => Users, () => CommunicationUsers, 'CommunicationId', 'UserId')
		users!: Users[];
}
