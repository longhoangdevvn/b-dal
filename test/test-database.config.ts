import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionGroupEntity, PermissionEntity, RolesPermissionsEntity, RoleEntity } from "../lib/entities";

export default {
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'secret',
      database: 'b-test',
      entities: [PermissionGroupEntity, PermissionEntity, RolesPermissionsEntity, RoleEntity],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([PermissionGroupEntity, PermissionEntity]),
  ],
}