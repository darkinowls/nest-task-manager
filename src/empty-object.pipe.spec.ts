import { EmptyObjectPipe } from './empty-object.pipe';


describe('EmptyObjectPipe', () => {


	it('should be defined', () => {
		expect(new EmptyObjectPipe()).toBeDefined();
	});

	it('use pipe when empty {}', () => {

		const pipe = new EmptyObjectPipe();

		try {
			pipe.transform({}, {
				type: 'body',
				metatype: Object,
				data: 'test'
			});
		} catch (e) {
			expect(e.message).toBe('Empty payload');
			return
		}
		throw new Error('Empty payload');


	});

	it('use pipe with not empty object', () => {

		const pipe = new EmptyObjectPipe();

		const obj = { a: 'a' };

		const res = pipe.transform(obj, {
			type: 'body',
			metatype: Object,
			data: 'test'
		});

		expect(obj).toEqual(res);

	});
});
