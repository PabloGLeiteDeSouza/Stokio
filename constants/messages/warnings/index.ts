import { delete_register } from "./delete";
import { operation_cancel } from "./operations";
import type { TypeDeleteMessages, TypeOperationCancel } from "./types";

export const delete_messages = {
    ...delete_register
} as TypeDeleteMessages;

export const operations = {
    ...operation_cancel
} as TypeOperationCancel;

export default {
    delete_messages,
    operations
}