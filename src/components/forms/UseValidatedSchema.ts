import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodObject, ZodRawShape } from "zod";

export const useValidatedForm = <SchemaType extends ZodRawShape>(schema: ZodObject<SchemaType>) => {
    const form = useForm({ resolver: zodResolver(schema) })
    return form
}