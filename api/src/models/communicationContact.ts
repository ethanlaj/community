import {
    Model,
    Column,
    Table,
    ForeignKey,
    PrimaryKey,
  } from "sequelize-typescript";
  import  Communications  from "./communication";
  import  Contacts  from "./contact";
  
  @Table({ tableName: 'CommunicationContacts' })
  export default class CommunicationContacts extends Model {
    @PrimaryKey
    @ForeignKey(() => Communications)
    @Column
    CommunicationId!: number;
  
    @PrimaryKey
    @ForeignKey(() => Contacts)
    @Column
    ContactId!: number;
  
    @Column
    createdAt!: Date;
  
    @Column
    updatedAt!: Date;
  }
  