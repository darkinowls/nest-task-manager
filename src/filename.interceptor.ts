import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import * as multer from 'multer';
import * as uuid from 'uuid';
import * as path from "path";
import * as fs from 'fs';

@Injectable()
export class FilenameInterceptor implements NestInterceptor {

	constructor(private readonly fieldName: string,
		private readonly options: multer.Options = { dest: 'uploads/' }) {
	}

	async intercept(context: ExecutionContext, next: CallHandler) {
		const request = context.switchToHttp().getRequest();
		const fileInterceptor = multer(this.options).single(this.fieldName);

		// Wrap fileInterceptor logic in a Promise
		await new Promise<void>((resolve, reject) => {
			// @ts-ignore
			fileInterceptor(request, undefined, async (err: any) => {
				if (err) {
					reject(err);
					return;
				}
				const file: Express.Multer.File = request.file;
				if (file) {
					// Custom filename logic here
					const filename = uuid.v4() + path.extname(file.originalname);
					const destination = path.join(__dirname, '..', this.options.dest!, filename);
					await fs.promises.rename(file.path, destination);
					request.body[this.fieldName] = {
						...file,
						filename: filename,
						path: destination // Optionally, include the file path
					};
				}
				resolve();
			});
		});


		return next.handle();
	}
}
