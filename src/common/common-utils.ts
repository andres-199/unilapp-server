
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class Util {
  constructor(@Inject('Sequelize') private readonly sequelize) {}

  public getParameters(parameters: any) {
    let limit = parameters.limit || null;

    let where: any;

    if (parameters.where) {
      where = JSON.parse(parameters.where);
    }

    let order = null;
    if (parameters.order) {
      order = JSON.parse(parameters.order);
    }

    let attributes = null;
    if (parameters.attributes) {
      attributes = JSON.parse(parameters.attributes);
    }

    let offset = 0;
    if (parameters.offset) {
      offset = JSON.parse(parameters.offset);
    }

    let group = null;
    if (parameters.group) {
      group = JSON.parse(parameters.group);
    }

    let include = null;
    if (parameters.include) {
      include = this.setInclude(JSON.parse(parameters.include));
    }

    let distinct = null;
    if (parameters.distinct) {
      distinct = JSON.parse(parameters.distinct);
    }

    let count = false;
    if (parameters.count) {
      count = JSON.parse(parameters.count);
    }

    const result = {
      where,
      limit,
      order,
      attributes,
      include,
      offset,
      group,
      distinct,
      count,
    };
    return result;
  }

  public setInclude(includes) {
    const response: any[] = [];
    const whenIsObject = (include: any) => {
      include['as'] = include.as ? include.as : include.model;

      include['model'] = this.sequelize.models[include.model];
      include['required'] = include['required'] ? include['required'] : false;

      if (include.attr) {
        include['attributes'] = include.attr;
      }

      let i;
      if ((i = include.include)) {
        include.include = this.setInclude(i);
      }

      return include;
    };

    includes.forEach(i => {
      let include: any = {};
      if (typeof i === 'object') {
        include = whenIsObject(i);
      } else {
        include['model'] = this.sequelize.models[i];
        include['as'] = i;
      }
      response.push(include);
    });

    return response;
  }
}
