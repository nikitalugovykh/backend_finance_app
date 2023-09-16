import { Prisma } from "@prisma/client"

export const returnUserObject: Prisma.UsersSelect = {
	id: true,
	email: true,
	firstname: true,
	lastname: true,
	phone: true,
	createdAt: true,
	updatedAt: true,


	portfolios: false,
	settings: false,
	password: false,
	invitations: false

}