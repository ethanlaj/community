import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Organizations } from '.';

@Table({ tableName: 'OrganizationLocations' })
export class OrganizationLocations extends Model {
	@Column
	public address!: string;

	@Column
	public name!: string;

	@ForeignKey(() => Organizations)
	@Column
	public organizationId!: number;

	@BelongsTo(() => Organizations)
		organization!: Organizations;
}
