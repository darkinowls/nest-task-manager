import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';


// Mock repository
const mockRepository = {
	findAndCount: jest.fn(),
	findOne: jest.fn(),
};

describe('TasksService', () => {
	let service: TasksService;
	let repo: Repository<Task>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TasksService,
				// Provide mock repository using getRepositoryToken
				{ provide: getRepositoryToken(Task), useFactory: () => mockRepository }
			]
		}).compile();

		// Initialize service and repository
		service = module.get<TasksService>(TasksService);
		repo = module.get<Repository<Task>>(getRepositoryToken(Task));
		for (const key in mockRepository) {
			mockRepository[key].mockClear();
		}
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should return tasks', async () => {
		// Mock the findAndCount method of the repository to return some data
		const mockedTasks = [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }];
		const totalCount = 2;
		expect(repo.findAndCount).not.toHaveBeenCalled();
		mockRepository.findAndCount.mockResolvedValueOnce([mockedTasks, totalCount]);

		// Call the findAll method of the service
		const [tasks, count] = await service.findAll({ offset: 0, limit: 10 }, '1');
		expect(repo.findAndCount).toBeCalledTimes(1);

		expect(tasks).toEqual(mockedTasks);
		expect(count).toEqual(totalCount);
	});


	it('should not find task by id', () => {
		// Mock the findOne method of the repository to return null
		expect(repo.findOne).not.toHaveBeenCalled();
		mockRepository.findOne.mockResolvedValueOnce(null);

		// Call the findOne method of the service
		expect(service.findOne('1', '1')).rejects.toThrowError('Invalid task id');
		expect(repo.findOne).toBeCalledTimes(1);
	});

	it ('should find task by id', async () => {
		// Mock the findOne method of the repository to return some data
		const mockedTask = {
			id: '1',
			title: 'Task 1',
			description: 'Description',
			status: TaskStatus.IN_PROGRESS,
		}
		expect(repo.findOne).not.toHaveBeenCalled();
		mockRepository.findOne.mockResolvedValueOnce(mockedTask);

		// Call the findOne method of the service
		const task = await service.findOne('1', '1');
		expect(repo.findOne).toBeCalledTimes(1);

		expect(task).toEqual(mockedTask);

	})


});
