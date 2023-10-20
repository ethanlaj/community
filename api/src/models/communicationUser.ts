import {
    Model,
    Column,
    Table,
    ForeignKey,
    PrimaryKey,
  } from "sequelize-typescript";
  import Communication  from "./communication";
  import  User  from "./user";
  
  @Table({ tableName: 'CommunicationUsers' })
  export default class CommunicationUsers extends Model {
    @PrimaryKey
    @ForeignKey(() => Communication)
    @Column
    CommunicationId!: number;
  
    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    UserId!: number;
  
    @Column
    createdAt!: Date;
  
    @Column
    updatedAt!: Date;
  }
  