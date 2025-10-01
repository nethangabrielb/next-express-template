import z from "zod";
import { userSchema } from "@/schemas/user";

type User = z.infer<typeof userSchema>;
