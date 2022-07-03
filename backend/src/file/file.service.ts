import { Injectable } from '@nestjs/common'
import { FileResponse } from './file.interface'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import * as sharpPath from 'path'
import * as sharp from 'sharp'

@Injectable()
export class FileService {
	async saveFiles(
		files: Array<Express.Multer.File>,
		folder: string = 'default'
	): Promise<FileResponse[]> {
		const uploadFolder = `${path}/uploads/${folder}`

		await ensureDir(uploadFolder)

		const res: FileResponse[] = await Promise.all(
			files.map(async (file) => {
				const originalName = sharpPath.parse(file.originalname).name
				const filename = originalName + '-' + Date.now() + '.webp'

				await sharp(file.buffer)
					.resize(800)
					.webp({ effort: 6, quality: 90 })
					.toFile(sharpPath.join(uploadFolder, filename))

				return {
					url: `/uploads/${folder}/${filename}`,
					name: filename,
				}
			})
		)

		return res
	}
}
