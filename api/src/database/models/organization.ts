import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AutoIncrement,
	DataType,
	BelongsToMany,
	HasMany,
} from 'sequelize-typescript';
import { CommunicationOrganizations, Communications, Contacts, OrganizationLocations } from '.';

@Table({ tableName: 'Organizations' })
export class Organizations extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	public id!: number;

	@Column({ type: DataType.STRING, allowNull: false })
	public name!: string;

	@BelongsToMany(() => Contacts, 'ContactOrganizations', 'organizationId', 'contactId')
		contacts?: Contacts[];

	@HasMany(() => OrganizationLocations, 'organizationId')
		organizationLocations?: OrganizationLocations[];

	@BelongsToMany(() => Communications, () => CommunicationOrganizations)
		communications?: Communications[];
}
