import { Injectable } from "@nestjs/common";
import { Connection, EntityManager, EntityTarget, SelectQueryBuilder } from "typeorm";

@Injectable()
export class PostgresService {
    manager: EntityManager;

    constructor(private connection: Connection) {
        this.manager = connection.manager;
    }

    createQueryBuilder<Entity>(entityClass: EntityTarget<Entity>, alias: string): SelectQueryBuilder<Entity> {
        return this.connection.createQueryBuilder(entityClass, alias);
    }

    transaction<T>(runInTransaction: (entityManager: EntityManager) => Promise<T>): Promise<T> {
        return this.connection.manager.transaction(runInTransaction);
    }
}
