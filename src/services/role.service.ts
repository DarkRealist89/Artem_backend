import { Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import {
    RequestRoleAddDTO,
    RequestRoleEditDTO,
    ResponseRoleGetDTO,
    ResponseRolesAddDTO,
    ResponseRolesDTO,
} from "../dto/role.dto";
import { Role, RoleFields } from "../entities/role.entity";
import { ModuleRef } from "@nestjs/core";
import { PostgresService } from "./db/db_postgres.service";

@Injectable()
export class RoleService implements OnModuleInit {
    private connection: PostgresService;

    constructor(private moduleRef: ModuleRef) {}

    onModuleInit() {
        this.connection = this.moduleRef.get(PostgresService);
    }

    /** Получение списка ролей */
    async getItems() {
        const builder = this.connection
            .createQueryBuilder(Role, "documents")
            .select([`documents.${RoleFields._id}`, `documents.${RoleFields.name}`]);

        const [items, count] = await builder.getManyAndCount();

        const result: ResponseRolesDTO = {
            items: items.map((elem) => this.entityToDto(elem, true)),
            records: count,
        };

        return result;
    }

    /** Просмотр записи */
    async getItem(id: string) {
        const currentDocument = await this.connection
            .createQueryBuilder(Role, "documents")
            .andWhere(`documents.${RoleFields._id} = :id`, { id: id })
            .getOne();
        if (!currentDocument) throw new NotFoundException("not_found");

        const result: ResponseRoleGetDTO = this.entityToDto(currentDocument, false);

        return result;
    }

    private entityToDto(elem: Role, withId: boolean) {
        const result: Partial<ResponseRoleGetDTO> = {
            name: elem.name,
        };

        if (withId) {
            result.id = elem._id;
        }
        return result as ResponseRoleGetDTO;
    }

    /** Добавление */
    async add(data: RequestRoleAddDTO) {
        let newDoc = new Role();
        newDoc.name = data.name;

        newDoc = await this.connection.manager.save(newDoc);

        const result: ResponseRolesAddDTO = {
            id: newDoc._id,
        };
        return result;
    }

    /** Изменение */
    async edit(id: string, data: RequestRoleEditDTO) {
        const currentDocument = await this.connection
            .createQueryBuilder(Role, "documents")
            .andWhere(`documents.${RoleFields._id} = :_id`, { _id: id })
            .getOne();
        if (!currentDocument) throw new NotFoundException("not_found");

        currentDocument.name = data.name;

        await this.connection.manager.save(currentDocument);
    }

    /** Удаление записи */
    async delete(id: string) {
        const currentDocument = await this.connection
            .createQueryBuilder(Role, "documents")
            .andWhere(`documents.${RoleFields._id} = :_id`, { _id: id })
            .getOne();
        if (!currentDocument) throw new NotFoundException("not_found");

        await this.connection.manager.remove(currentDocument);
    }
}
