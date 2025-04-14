import { CS571DefaultPublicConfig } from "@cs571/api-framework";

export default interface HW10PublicConfig extends CS571DefaultPublicConfig {
    IS_REMOTELY_HOSTED: boolean;
    HOST: string;
}