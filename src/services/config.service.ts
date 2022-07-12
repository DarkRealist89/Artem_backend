import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigService {
    development: boolean;
    db: {
        dbName?: string;
        host?: string;
        port?: number;
        username?: string;
        password?: string;
    };

    constructor() {
        this.initConfig();
    }

    private initConfig() {
        this.development = this.getEnv("DEVELOPMENT", false);
        this.db = {
            host: this.getEnv("DB_HOST"),
            port: this.getEnv("DB_PORT"),
            username: this.getEnv("DB_USERNAME"),
            password: String(this.getEnv("DB_PASSWORD")),
            dbName: this.getEnv("DB_NAME"),
        };
    }

    private getEnv(name: string, defValue = undefined) {
        let value: any = process.env[name];
        if (!value) return defValue;

        if (value === "true") value = true;
        else if (value === "false") value = false;
        else if (!isNaN(value) && value !== "") value = Number(value);

        return value;
    }
}
