import {
    Table,
    Column,
    Model,
    PrimaryKey,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    DataType,
  } from "sequelize-typescript";
  import  Contacts  from "./contact";
  import  Organizations  from "./organization";
  
  @Table({ tableName: "OrganizationContacts" })
  export default class OrganizationContacts extends Model {
    @CreatedAt
    @Column({ type: DataType.DATE, allowNull: false })
    createdAt!: Date;
  
    @UpdatedAt
    @Column({ type: DataType.DATE, allowNull: false })
    updatedAt!: Date;
  
    @PrimaryKey
    @ForeignKey(() => Contacts)
    @Column({ type: DataType.INTEGER, allowNull: false })
    ContactId!: number;
  
    @PrimaryKey
    @ForeignKey(() => Organizations)
    @Column({ type: DataType.INTEGER, allowNull: false })
    OrganizationId!: number;
  }
  