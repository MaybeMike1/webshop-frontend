import {httpService} from './httpService';

const orderService = {
    getAllByUser : getAllByUsers
}


async function getAllByUsers() {
    const res = await httpService.get('/orders/user-order');
    return res.data.data;
}

export default orderService;