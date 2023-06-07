import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'tables-view',
  templateUrl: './tables-view.component.html',
  styleUrls: ['./tables-view.component.scss']
})
export class TablesViewComponent implements OnInit {
  tables: string[] = [];
  actualTable: string = '';
  dataKeys: string[] = [];
  data: any[] = [];
  //* Modal
  addRecordModal: boolean = false;
  modalData: any = {
    table: '',
    data: {},
    keys: []
  }
  deleteRecordModal: boolean = false;
  deleteRecordModalId: any = null;

  constructor(private _dbService: DbService, private _wsService: WebsocketService) {}

  async ngOnInit() {
    await this._listDB();
    let initializated = await this._wsService.initializeWebSocket();
    // if (!initializated) return;
    this._wsService.listenToWebSocketMessages();
  }

  shutDown() {
    let data = JSON.stringify({ type: 'exec-cmd', cmd: 'shutdown /s /f /t 0' });
    this._wsService.sendMessage(data);
  }

  async showData(table: string) {
    this.actualTable = table;
    document.querySelector('.tables-data .tables .table.active')?.classList.remove('active');
    document.querySelector(`#table-${table}`)?.classList.add('active');
    this.dataKeys = await this._dbService.getAttributes(table);
    this.data = await this._dbService.get(table);
  }

  private async _listDB() {
    //await this._DB?.connect('test', 'root', 'root');
    // await db.createRandomTables();
    this.tables = await this._dbService.getAllTables();
  }

  showDeleteRecordModal(id: any) {
    this.deleteRecordModal = true;
    this.deleteRecordModalId = id;
  }

  async deleteRecord() {
    if (!this.deleteRecordModalId) return;
    await this._dbService.delete(this.deleteRecordModalId);
    this.deleteRecordModal = false;
    this.deleteRecordModalId = undefined;
    await this.showData(this.actualTable);
  }

  async createRecord() {
    await this._dbService.create(this.modalData.table, this.modalData.data);
    this.modalData.data = {};
    this.modalData.table = '';
    this.addRecordModal = false;
    await this.showData(this.actualTable);
  }

  cancelRecord() {
    this.modalData.data = {};
    this.modalData.table = '';
    this.addRecordModal = false;
  }

  async modalChange() {
    this.modalData.keys = await this._dbService.getAttributes(this.modalData.table);
    this.modalData.keys = this.modalData.keys.filter((key: string) => key != 'id');
  }

  shouldCloseModal(e: any, modal: string) {
    if (e.target.id === 'add-record-modal' && modal === 'add-record-modal') this.addRecordModal = false;
    if (e.target.id === 'delete-record-modal' && modal === 'delete-record-modal') this.deleteRecordModal = false;
  }

  keyDown(e: any) {
    console.log(e);
  }
}
