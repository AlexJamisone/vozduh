import axios from 'axios';
import { env } from '~/env.mjs';

type OrderInfo = {
	orderNumber: number;
	customer: string;
	phone: string;
	cdek: string;
	email?: string;
	comment?: string;
	product: {
		title: string;
		price: number;
		quintity: number;
		size: string;
		service?: string[];
	}[];
	total: number;
};
/**
 * Send notification to tg bot about order
 * @schema
 * export type OrderInfo = {
 *   orderId: number;
 *   customer: string;
 *   phone: string;
 *   cdek: string;
 *   email?: string
 *   comment?: string
 *   product: {
 *      title: string;
 *      price: number;
 *      quintity: number;
 *      size: string
 *      service?: string[]
 *   }[];
 *   total: number;
 *};
 *
 */
export async function notification(order: OrderInfo) {
	try {
		const response = await axios.post(
			`${env.BOT_DOMAIN}/${env.BOT_HOSTER}`,
			{
				...order,
			}
		);
		if (!response) throw new Error('Error in notification');
		if (response.status === 200) {
			return true;
		}
		return false;
	} catch (err) {
		console.log(err);
	}
}
