import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

export const RoleFields: { readonly [P in keyof Required<Role>]: P } = {
    _id: "_id",
    name: "name",
};

@Entity({
    name: "roles",
})
export class Role {
    @PrimaryGeneratedColumn("uuid")
    _id: string;

    @Column()
    @Index()
    name: string;
}
