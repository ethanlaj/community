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
  import Organizations  from './organization';
  import OrganizationLocations  from './organizationLocation';
  import  Contacts  from './contact';
  import Users  from './user';
  import  CommunicationContacts  from './communicationContact';
  import  CommunicationUsers  from './communicationUser';
  
  @Table({ tableName: 'Communications' })
  export default class Communications extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	id!: number;
  
	@Column
	date!: Date;
  
	@ForeignKey(() => Organizations)
	@Column
	organizationId?: number;
  
	@ForeignKey(() => OrganizationLocations)
	@Column
	locationId?: number;
  
	@Column
	note?: string;
  
	@BelongsTo(() => Organizations, 'organizationId')
	organization!: Organizations;
  
	@BelongsTo(() => OrganizationLocations, 'locationId')
	organizationLocation!: OrganizationLocations;
  
	@BelongsToMany(() => Contacts, () => CommunicationContacts, 'CommunicationId', 'ContactId')
	contacts!: Contacts[];
  
	@BelongsToMany(() => Users, () => CommunicationUsers, 'CommunicationId', 'UserId')
	users!: Users[];
  }
  