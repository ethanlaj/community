import {
	Table,
	Column,
	Model,
	PrimaryKey,
	CreatedAt,
	UpdatedAt,
	ForeignKey,
	DataType,
	BelongsTo,
} from 'sequelize-typescript';
import { Contacts, Organizations } from '.';

@Table({ tableName: 'OrganizationContacts' })
export class OrganizationContacts extends Model {
	@CreatedAt
	@Column({ type: DataType.DATE, allowNull: false })
		createdAt!: Date;

	@UpdatedAt
	@Column({ type: DataType.DATE, allowNull: false })
		updatedAt!: Date;

	@PrimaryKey
	@ForeignKey(() => Contacts)
	@Column({ type: DataType.INTEGER, allowNull: false })
		contactId!: number;

	@PrimaryKey
	@ForeignKey(() => Organizations)
	@Column({ type: DataType.INTEGER, allowNull: false })
		organizationId!: number;

	@Column({ type: DataType.STRING(15), allowNull: true })
		phone?: string;

	@Column({ type: DataType.STRING(10), allowNull: true })
		exten?: string;
	
	@Column({ type: DataType.STRING(75), allowNull: true })
		email?: string;

	@BelongsTo(() => Organizations)
		organization?: Organizations; 

	@BelongsTo(() => Contacts)
		contact?: Contacts; 
	
}
