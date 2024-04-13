import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../lib/entities/user/user.entity';
import { UserRepository } from '../../lib/repositories/user/user.repository';

describe('UserEntity', () => {
  let userRepository: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'root',
          password: 'secret',
          database: 'b-test',
          entities: [UserEntity],
          synchronize: false,
        }),
        TypeOrmModule.forFeature([UserEntity]),
      ],
    }).compile();

    userRepository = module.get<UserRepository>('UserEntityRepository');
  });

  let createdUser: UserEntity;

  it('should create a user', async () => {
    const user = userRepository.create({
      email: 'test@test.com',
      fullName: 'Test User',
      password: 'password',
      avatar: null,
    });
    createdUser = await userRepository.save(user);
    expect(createdUser).toHaveProperty('id');
  });

  it('should find the created user', async () => {
    const foundUser = await userRepository.findOne({
      where: {
        id: createdUser.id,
        deletedAt: null,
      },
    });
    expect(foundUser).toBeDefined();
    expect(foundUser.email).toEqual('test@test.com');
  });

  it('should update the created user', async () => {
    createdUser.fullName = 'Updated User';
    const updatedUser = await userRepository.save(createdUser);
    expect(updatedUser.fullName).toEqual('Updated User');
  });

  it('should delete the created user', async () => {
    await userRepository.softDelete({
      id: createdUser.id,
    });
    const foundUser = await userRepository.findOne({
      where: {
        id: createdUser.id,
        deletedAt: null,
      },
    });
    expect(foundUser).toBeNull();
  });

  afterAll(async () => {
    await userRepository.delete({});
  });
});
