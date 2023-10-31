import {
	Table,
	Column,
	Model,
	PrimaryKey,
	CreatedAt,
	UpdatedAt,
	ForeignKey,
	DataType,
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
}
