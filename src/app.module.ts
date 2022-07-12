import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { RoleController } from "./controllers/role.controller";
import { Role } from "./entities/role.entity";
import { ApiService } from "./services/api.service";
import { ConfigService } from "./services/config.service";
import { PostgresService } from "./services/db/db_postgres.service";
import { RoleService } from "./services/role.service";

@Module({
    controllers: [
        //
        RoleController,
    ],
    providers: [
        //
        ApiService,
        ConfigService,
        RoleService,
        PostgresService,
    ],
    imports: [
        TypeOrmModule.forFeature([Role]),
        TypeOrmModule.forRootAsync({
            useFactory: () => {
                const configService = new ConfigService();
                const typeOrmConfig: TypeOrmModuleOptions = {
                    type: "postgres",
                    host: configService.db.host,
                    port: configService.db.port,
                    username: configService.db.username,
                    password: configService.db.password,
                    database: configService.db.dbName,
                    entities: [],
                    synchronize: true,
                    logging: false,
                    autoLoadEntities: true,
                    retryAttempts: 10000000,
                    applicationName: "test_app",
                };

                return typeOrmConfig;
            },
        }),
    ],
    exports: [],
})
export class AppModule {}
