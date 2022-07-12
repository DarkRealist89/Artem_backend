import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { cApiRoleAdd, cApiRoleDelete, cApiRoleEdit, cApiRoleGet, cApiRoles } from "src/api_consts/role.api.consts";
import { RequestRoleAddDTO, RequestRoleEditDTO } from "../dto/role.dto";
import { RoleService } from "../services/role.service";

@Controller()
@ApiTags("Роли")
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    /** Получение списка ролей */
    @Post(cApiRoles)
    @HttpCode(HttpStatus.OK)
    async getItems() {
        return await this.roleService.getItems();
    }

    /** Просмотр записи */
    @Get(cApiRoleGet)
    async getItem(@Param("id", ParseUUIDPipe) id: string) {
        return await this.roleService.getItem(id);
    }

    /** Добавление */
    @Post(cApiRoleAdd)
    async add(@Body() data: RequestRoleAddDTO) {
        return await this.roleService.add(data);
    }

    /** Изменение */
    @Post(cApiRoleEdit)
    @HttpCode(HttpStatus.OK)
    async edit(@Param("id", ParseUUIDPipe) id: string, @Body() data: RequestRoleEditDTO) {
        return await this.roleService.edit(id, data);
    }

    /** Удаление записи */
    @Delete(cApiRoleDelete)
    @HttpCode(HttpStatus.OK)
    async delete(@Param("id", ParseUUIDPipe) id: string) {
        await this.roleService.delete(id);
    }
}
