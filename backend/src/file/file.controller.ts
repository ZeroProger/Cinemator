import {
	Controller,
	HttpCode,
	Post,
	Query,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FileService } from './file.service'

@Controller('files')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post()
	@HttpCode(200)
	@Auth('admin')
	@UseInterceptors(FilesInterceptor('files'))
	async uploadFiles(
		@UploadedFiles() files: Array<Express.Multer.File>,
		@Query('folder') folder?: string
	) {
		return await this.fileService.saveFiles(files, folder)
	}
}
