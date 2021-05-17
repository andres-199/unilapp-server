import { Injectable } from '@nestjs/common';
import { Model } from 'sequelize-typescript';

@Injectable()
export class CommonFunctionsService {
  private _model;
  public set model(model: any) {
    this._model = model;
  }

  async delete(id: number) {
    return await this._model.destroy({ where: { id } });
  }

  async update(data, params) {
    params.where = { id: data.id };
    params.returning = true;
    return await this._model.update(data, params);
  }

  async create(data, params) {
    return await this._model.create(data, params);
  }

  async findAll(params) {
    return await this._model.findAll(params);
  }

  async findByPk(id: number, params) {
    return await this._model.findByPk(id, params);
  }

  async findList(params: any): Promise<any> {
    return await this._model.findAll(params).map((i: any) => i.toJSON());
  }
}
