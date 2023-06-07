import { Injectable } from '@angular/core';
import { Surreal } from "surrealdb.js";

@Injectable({
  providedIn: 'root'
})
export class DbService {
  //! Comando para iniciar la base de datos:
  //* surreal start --user root --pass root file:C:\SurrealDB\test.db
  //! Comando para logearse a una base de datos:
  //* surreal sql --conn http://localhost:8000 --user root --pass root --ns test --db test --pretty
  //? --conn: Es la dirección del servidor
  //? --user: Es el usuario
  //? --pass: Es la contraseña
  //? --ns: Es el namespace
  //? --db: Es la base de datos
  private _DB: any;
  private _DBInfo: any = {
    name: '',
    user: ''
  };
  static initializated: boolean;

  constructor() {
    if (this._DB) return;
    try {
      this._DB = new Surreal('http://127.0.0.1:8000/rpc');
    } catch (error) {
      return;
    }
  }

  async connect(db: string, user: string, pass: string) {
    try {
      await this._DB.signin({ user, pass });
      await this._DB.use(db, db);
      DbService.initializated = true;
      this._DBInfo.name = db;
      this._DBInfo.user = user;
      return this._DB;
    } catch (error) {
      return null;
    }
  }

  getDatabaseName() {
    return this._DBInfo.name;
  }

  instance() {
    return this._DB;
  }

  async getAllTables() {
    console.log(this._DB)
    let result = await this._DB.query('INFO FOR DB;');
    console.log(result);
    return Object.keys(result[0].result.tb);
  }

  async getAttributes(table: string) {
    let result = await this._DB.query(`SELECT * FROM ${table} LIMIT 1;`);
    return Object.keys(result[0].result[0]);
  }

  async get(table: string, id?: number) {
    let result = await this._DB.query(`SELECT * FROM ${table}${id ? ` WHERE id = ${id}` : ''};`);
    return result[0].result;
  }

  async create(table: string, data: any) {
    let result = await this._DB.create(table, data);
    return result;
  }

  async delete(id: any) {
    let result = await this._DB.delete(id);
    return result;
  }
}
