import { TypeOrmModule } from "@nestjs/typeorm";
import { 
  PermissionGroupEntity,
  PermissionEntity,
  RolesPermissionsEntity,
  RoleEntity,
  UserEntity,
  TeamEntity,
  StoreEntity,
  AppEntity
} from "../lib/entities";

const entities = [
  PermissionGroupEntity,
  PermissionEntity,
  RolesPermissionsEntity,
  RoleEntity,
  UserEntity,
  TeamEntity,
  StoreEntity,
  AppEntity
];

export default {
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'secret',
      database: 'b-test',
      entities,
      synchronize: false,
    }),
    TypeOrmModule.forFeature(entities),
  ],
}