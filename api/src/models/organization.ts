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
  import Contacts from './contact'; // Import your Contact model
  import OrganizationLocations from './organizationLocation'; // Import your OrganizationLocation model
  import Communications from './communication'; // Import your Communication model
  
  @Table({ tableName: 'Organizations' })
  export default class Organization extends Model {
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
  
	@HasMany(() => Communications, 'organizationId')
	communications?: Communications[];
  }
  