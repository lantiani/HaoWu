import {nanoid} from 'nanoid';

export function orderId() {
    const data = new Date();
    const year = data.getFullYear();
    const month = data.getMonth() + 1;
    const day = data.getDay();
    const hours = data.getHours();
    const minutes = data.getMinutes();
    const order = nanoid();
    return `${year}${month}${day}${hours}${minutes}${order}`;
}