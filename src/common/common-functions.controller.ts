import {
	Controller,
	Delete,
	Put,
	Post,
	Get,
	Query,
	Param,
	Body,
} from '@nestjs/common';
import { CommonFunctionsService } from './common-functions.service';
import { Util } from './common-utils';


@Controller()
export class CommonFunctionsController {
	public displayField = ['nombre']

	constructor(private readonly commonService: CommonFunctionsService, private readonly util: Util) { }

	@Get()
	async findAll(@Query() queryParams) {
		const parameters = this.util.getParameters(queryParams);
		return await this.commonService.findAll(parameters);
	}

	@Get('/list')
	public async findList(@Query() params: any) {
		console.log('llegando');
		const parameters = this.util.getParameters(params)
		const data = await this.commonService.findList(parameters)
		parameters.attributes = ['id', 'name']
		console.log( this.concatenaField(params, data));
		return 
	}

	@Get('/:id')
	async findOne(@Param('id') id, @Query() queryParams) {
		return await this.commonService.findByPk(id, queryParams);
	}

	@Post()
	async create(@Body() data, @Query() queryParams) {
		return await this.commonService.create(data, queryParams);
	}

	@Put()
	async update(@Body() data, @Query() queryParams) {
		return await this.commonService.update(data, queryParams);
	}


	@Delete('/:id')
	async delete(@Param('id') id, @Query() queryParams) {
		return await this.commonService.delete(id);
	}

	private concatenaField(params: any, data: any) {
		const left = this

		if (params['displayField']) {
			this.displayField = JSON.parse(params['displayField'])
		}

		const dataResult = data.map((item: any) => {
			let label = ''
			for (const key of left.displayField) {
				label += item[key] + ' '
			}
			return { value: item.id, label }
		})

		return dataResult
	}
}
