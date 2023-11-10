import {
	Table,
	Column,
	Model,
	PrimaryKey,
	DataType,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript';
import { Contacts } from './contact';

@Table({ tableName: 'ContactAliases' })
export class ContactAliases extends Model {
	@PrimaryKey
	@Column({ type: DataType.STRING, allowNull: false })
		alias!: string;
		
	@PrimaryKey
	@ForeignKey(() => Contacts)
	@Column
		contactId!: number;

	@BelongsTo(() => Contacts, { onDelete: 'CASCADE' })
		contact!: Contacts;
}