import {
	Table,
	Column,
	Model,
	PrimaryKey,
	DataType,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript';
import { Organizations } from './organization';

@Table({ tableName: 'OrganizationAliases' })
export class OrganizationAliases extends Model {
	@PrimaryKey
	@Column({ type: DataType.STRING, allowNull: false })
		alias!: string;
	
	@ForeignKey(() => Organizations)
	@Column
		organizationId!: number;

	@BelongsTo(() => Organizations, 'organizationId')
		organization!: Organizations;
}