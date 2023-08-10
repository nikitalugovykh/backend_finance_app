import { Prisma } from "@prisma/client"

export const returnUserObject: Prisma.UsersSelect = {
	id: true,
	email: true,
	firstname: true,
	lastname: true,
	password: false,
	phone: true,
	createdAt: true,
	updatedAt: true,
}