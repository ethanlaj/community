import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Organizations } from '.';

@Table({ tableName: 'OrganizationLocations', paranoid: true })
export class OrganizationLocations extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	public id!: number;

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
