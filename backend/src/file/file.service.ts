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
		folder: string = 'default',
		userId: number | null = null
	): Promise<FileResponse[]> {
		const uploadFolder = userId ? `${path}/uploads/avatars/${userId}` : `${path}/uploads/${folder}`

		await ensureDir(uploadFolder)

		const res: FileResponse[] = await Promise.all(
			files.map(async (file) => {
				const originalName = sharpPath.parse(file.originalname).name
				const filename = originalName + '.webp'
				const filePath = sharpPath.join(uploadFolder, filename)
				const fileUrl = userId ? `/uploads/avatars/${userId}/${filename}` : `/uploads/${folder}/${filename}`

				await sharp(file.buffer)
					.resize(800)
					.webp({ effort: 6, quality: 90 })
					.toFile(filePath)

				return {
					url: fileUrl,
					name: filename,
				}
			})
		)

		return res
	}
}
